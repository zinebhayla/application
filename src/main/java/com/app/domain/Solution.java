package com.app.domain;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A Solution.
 */
@Entity
@Table(name = "solution")
public class Solution implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "date")
    private Instant date;

    @Column(name = "state")
    private Integer state;

    @Lob
    @Column(name = "file")
    private byte[] file;

    @Column(name = "file_content_type")
    private String fileContentType;

    @Lob
    @Column(name = "content")
    private String content;

    @Column(name = "donwload")
    private Integer donwload;

    @OneToOne
    @JoinColumn(unique = true)
    private Exercise exercise;

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

    public Solution title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Instant getDate() {
        return date;
    }

    public Solution date(Instant date) {
        this.date = date;
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public Integer getState() {
        return state;
    }

    public Solution state(Integer state) {
        this.state = state;
        return this;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    public byte[] getFile() {
        return file;
    }

    public Solution file(byte[] file) {
        this.file = file;
        return this;
    }

    public void setFile(byte[] file) {
        this.file = file;
    }

    public String getFileContentType() {
        return fileContentType;
    }

    public Solution fileContentType(String fileContentType) {
        this.fileContentType = fileContentType;
        return this;
    }

    public void setFileContentType(String fileContentType) {
        this.fileContentType = fileContentType;
    }

    public String getContent() {
        return content;
    }

    public Solution content(String content) {
        this.content = content;
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Integer getDonwload() {
        return donwload;
    }

    public Solution donwload(Integer donwload) {
        this.donwload = donwload;
        return this;
    }

    public void setDonwload(Integer donwload) {
        this.donwload = donwload;
    }

    public Exercise getExercise() {
        return exercise;
    }

    public Solution exercise(Exercise exercise) {
        this.exercise = exercise;
        return this;
    }

    public void setExercise(Exercise exercise) {
        this.exercise = exercise;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Solution)) {
            return false;
        }
        return id != null && id.equals(((Solution) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Solution{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", date='" + getDate() + "'" +
            ", state=" + getState() +
            ", file='" + getFile() + "'" +
            ", fileContentType='" + getFileContentType() + "'" +
            ", content='" + getContent() + "'" +
            ", donwload=" + getDonwload() +
            "}";
    }
}
