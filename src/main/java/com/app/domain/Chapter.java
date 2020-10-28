package com.app.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A Chapter.
 */
@Entity
@Table(name = "chapter")
public class Chapter implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "date")
    private Instant date;

    @Column(name = "state")
    private Integer state;

    @ManyToOne
    @JsonIgnoreProperties("chapters")
    private Course course;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Chapter name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Instant getDate() {
        return date;
    }

    public Chapter date(Instant date) {
        this.date = date;
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public Integer getState() {
        return state;
    }

    public Chapter state(Integer state) {
        this.state = state;
        return this;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    public Course getCourse() {
        return course;
    }

    public Chapter course(Course course) {
        this.course = course;
        return this;
    }

    public void setCourse(Course course) {
        this.course = course;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Chapter)) {
            return false;
        }
        return id != null && id.equals(((Chapter) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Chapter{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", date='" + getDate() + "'" +
            ", state=" + getState() +
            "}";
    }
}
