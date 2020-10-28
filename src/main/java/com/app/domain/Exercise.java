package com.app.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;

import com.app.domain.enumeration.Level;

/**
 * not an ignored comment
 */
@ApiModel(description = "not an ignored comment")
@Entity
@Table(name = "exercise")
public class Exercise implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Lob
    @Column(name = "content")
    private String content;

    @Column(name = "date")
    private Instant date;

    @Column(name = "state")
    private Integer state;

    @Enumerated(EnumType.STRING)
    @Column(name = "level")
    private Level level;

    @Column(name = "visit")
    private Integer visit;

    @ManyToOne
    @JsonIgnoreProperties("exercises")
    private Chapter chapter;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Exercise title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public Exercise content(String content) {
        this.content = content;
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Instant getDate() {
        return date;
    }

    public Exercise date(Instant date) {
        this.date = date;
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public Integer getState() {
        return state;
    }

    public Exercise state(Integer state) {
        this.state = state;
        return this;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    public Level getLevel() {
        return level;
    }

    public Exercise level(Level level) {
        this.level = level;
        return this;
    }

    public void setLevel(Level level) {
        this.level = level;
    }

    public Integer getVisit() {
        return visit;
    }

    public Exercise visit(Integer visit) {
        this.visit = visit;
        return this;
    }

    public void setVisit(Integer visit) {
        this.visit = visit;
    }

    public Chapter getChapter() {
        return chapter;
    }

    public Exercise chapter(Chapter chapter) {
        this.chapter = chapter;
        return this;
    }

    public void setChapter(Chapter chapter) {
        this.chapter = chapter;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Exercise)) {
            return false;
        }
        return id != null && id.equals(((Exercise) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Exercise{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", content='" + getContent() + "'" +
            ", date='" + getDate() + "'" +
            ", state=" + getState() +
            ", level='" + getLevel() + "'" +
            ", visit=" + getVisit() +
            "}";
    }
}
