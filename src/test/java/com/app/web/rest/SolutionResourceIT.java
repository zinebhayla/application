package com.app.web.rest;

import com.app.TravailApp;
import com.app.domain.Solution;
import com.app.repository.SolutionRepository;
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
import org.springframework.util.Base64Utils;
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
 * Integration tests for the {@link SolutionResource} REST controller.
 */
@SpringBootTest(classes = TravailApp.class)
public class SolutionResourceIT {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Integer DEFAULT_STATE = 1;
    private static final Integer UPDATED_STATE = 2;

    private static final byte[] DEFAULT_FILE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_FILE = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_FILE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_FILE_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    private static final Integer DEFAULT_DONWLOAD = 1;
    private static final Integer UPDATED_DONWLOAD = 2;

    @Autowired
    private SolutionRepository solutionRepository;

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

    private MockMvc restSolutionMockMvc;

    private Solution solution;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SolutionResource solutionResource = new SolutionResource(solutionRepository);
        this.restSolutionMockMvc = MockMvcBuilders.standaloneSetup(solutionResource)
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
    public static Solution createEntity(EntityManager em) {
        Solution solution = new Solution()
            .title(DEFAULT_TITLE)
            .date(DEFAULT_DATE)
            .state(DEFAULT_STATE)
            .file(DEFAULT_FILE)
            .fileContentType(DEFAULT_FILE_CONTENT_TYPE)
            .content(DEFAULT_CONTENT)
            .donwload(DEFAULT_DONWLOAD);
        return solution;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Solution createUpdatedEntity(EntityManager em) {
        Solution solution = new Solution()
            .title(UPDATED_TITLE)
            .date(UPDATED_DATE)
            .state(UPDATED_STATE)
            .file(UPDATED_FILE)
            .fileContentType(UPDATED_FILE_CONTENT_TYPE)
            .content(UPDATED_CONTENT)
            .donwload(UPDATED_DONWLOAD);
        return solution;
    }

    @BeforeEach
    public void initTest() {
        solution = createEntity(em);
    }

    @Test
    @Transactional
    public void createSolution() throws Exception {
        int databaseSizeBeforeCreate = solutionRepository.findAll().size();

        // Create the Solution
        restSolutionMockMvc.perform(post("/api/solutions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(solution)))
            .andExpect(status().isCreated());

        // Validate the Solution in the database
        List<Solution> solutionList = solutionRepository.findAll();
        assertThat(solutionList).hasSize(databaseSizeBeforeCreate + 1);
        Solution testSolution = solutionList.get(solutionList.size() - 1);
        assertThat(testSolution.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testSolution.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testSolution.getState()).isEqualTo(DEFAULT_STATE);
        assertThat(testSolution.getFile()).isEqualTo(DEFAULT_FILE);
        assertThat(testSolution.getFileContentType()).isEqualTo(DEFAULT_FILE_CONTENT_TYPE);
        assertThat(testSolution.getContent()).isEqualTo(DEFAULT_CONTENT);
        assertThat(testSolution.getDonwload()).isEqualTo(DEFAULT_DONWLOAD);
    }

    @Test
    @Transactional
    public void createSolutionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = solutionRepository.findAll().size();

        // Create the Solution with an existing ID
        solution.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSolutionMockMvc.perform(post("/api/solutions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(solution)))
            .andExpect(status().isBadRequest());

        // Validate the Solution in the database
        List<Solution> solutionList = solutionRepository.findAll();
        assertThat(solutionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllSolutions() throws Exception {
        // Initialize the database
        solutionRepository.saveAndFlush(solution);

        // Get all the solutionList
        restSolutionMockMvc.perform(get("/api/solutions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(solution.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].state").value(hasItem(DEFAULT_STATE)))
            .andExpect(jsonPath("$.[*].fileContentType").value(hasItem(DEFAULT_FILE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].file").value(hasItem(Base64Utils.encodeToString(DEFAULT_FILE))))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT.toString())))
            .andExpect(jsonPath("$.[*].donwload").value(hasItem(DEFAULT_DONWLOAD)));
    }
    
    @Test
    @Transactional
    public void getSolution() throws Exception {
        // Initialize the database
        solutionRepository.saveAndFlush(solution);

        // Get the solution
        restSolutionMockMvc.perform(get("/api/solutions/{id}", solution.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(solution.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.state").value(DEFAULT_STATE))
            .andExpect(jsonPath("$.fileContentType").value(DEFAULT_FILE_CONTENT_TYPE))
            .andExpect(jsonPath("$.file").value(Base64Utils.encodeToString(DEFAULT_FILE)))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT.toString()))
            .andExpect(jsonPath("$.donwload").value(DEFAULT_DONWLOAD));
    }

    @Test
    @Transactional
    public void getNonExistingSolution() throws Exception {
        // Get the solution
        restSolutionMockMvc.perform(get("/api/solutions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSolution() throws Exception {
        // Initialize the database
        solutionRepository.saveAndFlush(solution);

        int databaseSizeBeforeUpdate = solutionRepository.findAll().size();

        // Update the solution
        Solution updatedSolution = solutionRepository.findById(solution.getId()).get();
        // Disconnect from session so that the updates on updatedSolution are not directly saved in db
        em.detach(updatedSolution);
        updatedSolution
            .title(UPDATED_TITLE)
            .date(UPDATED_DATE)
            .state(UPDATED_STATE)
            .file(UPDATED_FILE)
            .fileContentType(UPDATED_FILE_CONTENT_TYPE)
            .content(UPDATED_CONTENT)
            .donwload(UPDATED_DONWLOAD);

        restSolutionMockMvc.perform(put("/api/solutions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSolution)))
            .andExpect(status().isOk());

        // Validate the Solution in the database
        List<Solution> solutionList = solutionRepository.findAll();
        assertThat(solutionList).hasSize(databaseSizeBeforeUpdate);
        Solution testSolution = solutionList.get(solutionList.size() - 1);
        assertThat(testSolution.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testSolution.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testSolution.getState()).isEqualTo(UPDATED_STATE);
        assertThat(testSolution.getFile()).isEqualTo(UPDATED_FILE);
        assertThat(testSolution.getFileContentType()).isEqualTo(UPDATED_FILE_CONTENT_TYPE);
        assertThat(testSolution.getContent()).isEqualTo(UPDATED_CONTENT);
        assertThat(testSolution.getDonwload()).isEqualTo(UPDATED_DONWLOAD);
    }

    @Test
    @Transactional
    public void updateNonExistingSolution() throws Exception {
        int databaseSizeBeforeUpdate = solutionRepository.findAll().size();

        // Create the Solution

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSolutionMockMvc.perform(put("/api/solutions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(solution)))
            .andExpect(status().isBadRequest());

        // Validate the Solution in the database
        List<Solution> solutionList = solutionRepository.findAll();
        assertThat(solutionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSolution() throws Exception {
        // Initialize the database
        solutionRepository.saveAndFlush(solution);

        int databaseSizeBeforeDelete = solutionRepository.findAll().size();

        // Delete the solution
        restSolutionMockMvc.perform(delete("/api/solutions/{id}", solution.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Solution> solutionList = solutionRepository.findAll();
        assertThat(solutionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
