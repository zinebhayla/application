package com.app.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

import com.app.domain.enumeration.Level;

/**
 * A Project.
 */
@Entity
@Table(name = "project")
public class Project implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Lob
    @Column(name = "description")
    private byte[] description;

    @Column(name = "description_content_type")
    private String descriptionContentType;

    @Column(name = "date")
    private Instant date;

    @Enumerated(EnumType.STRING)
    @Column(name = "level")
    private Level level;

    @Column(name = "visit")
    private Integer visit;

    @ManyToMany(mappedBy = "projects")
    @JsonIgnore
    private Set<Tag> tags = new HashSet<>();

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

    public Project title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public byte[] getDescription() {
        return description;
    }

    public Project description(byte[] description) {
        this.description = description;
        return this;
    }

    public void setDescription(byte[] description) {
        this.description = description;
    }

    public String getDescriptionContentType() {
        return descriptionContentType;
    }

    public Project descriptionContentType(String descriptionContentType) {
        this.descriptionContentType = descriptionContentType;
        return this;
    }

    public void setDescriptionContentType(String descriptionContentType) {
        this.descriptionContentType = descriptionContentType;
    }

    public Instant getDate() {
        return date;
    }

    public Project date(Instant date) {
        this.date = date;
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public Level getLevel() {
        return level;
    }

    public Project level(Level level) {
        this.level = level;
        return this;
    }

    public void setLevel(Level level) {
        this.level = level;
    }

    public Integer getVisit() {
        return visit;
    }

    public Project visit(Integer visit) {
        this.visit = visit;
        return this;
    }

    public void setVisit(Integer visit) {
        this.visit = visit;
    }

    public Set<Tag> getTags() {
        return tags;
    }

    public Project tags(Set<Tag> tags) {
        this.tags = tags;
        return this;
    }

    public Project addTag(Tag tag) {
        this.tags.add(tag);
        tag.getProjects().add(this);
        return this;
    }

    public Project removeTag(Tag tag) {
        this.tags.remove(tag);
        tag.getProjects().remove(this);
        return this;
    }

    public void setTags(Set<Tag> tags) {
        this.tags = tags;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Project)) {
            return false;
        }
        return id != null && id.equals(((Project) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Project{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", description='" + getDescription() + "'" +
            ", descriptionContentType='" + getDescriptionContentType() + "'" +
            ", date='" + getDate() + "'" +
            ", level='" + getLevel() + "'" +
            ", visit=" + getVisit() +
            "}";
    }
}
