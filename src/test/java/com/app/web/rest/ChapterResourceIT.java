package com.app.web.rest;

import com.app.TravailApp;
import com.app.domain.Chapter;
import com.app.repository.ChapterRepository;
import com.app.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static com.app.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ChapterResource} REST controller.
 */
@SpringBootTest(classes = TravailApp.class)
public class ChapterResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Integer DEFAULT_STATE = 1;
    private static final Integer UPDATED_STATE = 2;

    @Autowired
    private ChapterRepository chapterRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restChapterMockMvc;

    private Chapter chapter;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ChapterResource chapterResource = new ChapterResource(chapterRepository);
        this.restChapterMockMvc = MockMvcBuilders.standaloneSetup(chapterResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Chapter createEntity(EntityManager em) {
        Chapter chapter = new Chapter()
            .name(DEFAULT_NAME)
            .date(DEFAULT_DATE)
            .state(DEFAULT_STATE);
        return chapter;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Chapter createUpdatedEntity(EntityManager em) {
        Chapter chapter = new Chapter()
            .name(UPDATED_NAME)
            .date(UPDATED_DATE)
            .state(UPDATED_STATE);
        return chapter;
    }

    @BeforeEach
    public void initTest() {
        chapter = createEntity(em);
    }

    @Test
    @Transactional
    public void createChapter() throws Exception {
        int databaseSizeBeforeCreate = chapterRepository.findAll().size();

        // Create the Chapter
        restChapterMockMvc.perform(post("/api/chapters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(chapter)))
            .andExpect(status().isCreated());

        // Validate the Chapter in the database
        List<Chapter> chapterList = chapterRepository.findAll();
        assertThat(chapterList).hasSize(databaseSizeBeforeCreate + 1);
        Chapter testChapter = chapterList.get(chapterList.size() - 1);
        assertThat(testChapter.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testChapter.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testChapter.getState()).isEqualTo(DEFAULT_STATE);
    }

    @Test
    @Transactional
    public void createChapterWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = chapterRepository.findAll().size();

        // Create the Chapter with an existing ID
        chapter.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restChapterMockMvc.perform(post("/api/chapters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(chapter)))
            .andExpect(status().isBadRequest());

        // Validate the Chapter in the database
        List<Chapter> chapterList = chapterRepository.findAll();
        assertThat(chapterList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllChapters() throws Exception {
        // Initialize the database
        chapterRepository.saveAndFlush(chapter);

        // Get all the chapterList
        restChapterMockMvc.perform(get("/api/chapters?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(chapter.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].state").value(hasItem(DEFAULT_STATE)));
    }
    
    @Test
    @Transactional
    public void getChapter() throws Exception {
        // Initialize the database
        chapterRepository.saveAndFlush(chapter);

        // Get the chapter
        restChapterMockMvc.perform(get("/api/chapters/{id}", chapter.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(chapter.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.state").value(DEFAULT_STATE));
    }

    @Test
    @Transactional
    public void getNonExistingChapter() throws Exception {
        // Get the chapter
        restChapterMockMvc.perform(get("/api/chapters/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateChapter() throws Exception {
        // Initialize the database
        chapterRepository.saveAndFlush(chapter);

        int databaseSizeBeforeUpdate = chapterRepository.findAll().size();

        // Update the chapter
        Chapter updatedChapter = chapterRepository.findById(chapter.getId()).get();
        // Disconnect from session so that the updates on updatedChapter are not directly saved in db
        em.detach(updatedChapter);
        updatedChapter
            .name(UPDATED_NAME)
            .date(UPDATED_DATE)
            .state(UPDATED_STATE);

        restChapterMockMvc.perform(put("/api/chapters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedChapter)))
            .andExpect(status().isOk());

        // Validate the Chapter in the database
        List<Chapter> chapterList = chapterRepository.findAll();
        assertThat(chapterList).hasSize(databaseSizeBeforeUpdate);
        Chapter testChapter = chapterList.get(chapterList.size() - 1);
        assertThat(testChapter.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testChapter.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testChapter.getState()).isEqualTo(UPDATED_STATE);
    }

    @Test
    @Transactional
    public void updateNonExistingChapter() throws Exception {
        int databaseSizeBeforeUpdate = chapterRepository.findAll().size();

        // Create the Chapter

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restChapterMockMvc.perform(put("/api/chapters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(chapter)))
            .andExpect(status().isBadRequest());

        // Validate the Chapter in the database
        List<Chapter> chapterList = chapterRepository.findAll();
        assertThat(chapterList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteChapter() throws Exception {
        // Initialize the database
        chapterRepository.saveAndFlush(chapter);

        int databaseSizeBeforeDelete = chapterRepository.findAll().size();

        // Delete the chapter
        restChapterMockMvc.perform(delete("/api/chapters/{id}", chapter.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Chapter> chapterList = chapterRepository.findAll();
        assertThat(chapterList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
