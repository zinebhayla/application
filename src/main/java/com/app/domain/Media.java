package com.app.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Media.
 */
@Entity
@Table(name = "media")
public class Media implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @Column(name = "url")
    private byte[] url;

    @Column(name = "url_content_type")
    private String urlContentType;

    @ManyToOne
    @JsonIgnoreProperties("media")
    private Project project;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getUrl() {
        return url;
    }

    public Media url(byte[] url) {
        this.url = url;
        return this;
    }

    public void setUrl(byte[] url) {
        this.url = url;
    }

    public String getUrlContentType() {
        return urlContentType;
    }

    public Media urlContentType(String urlContentType) {
        this.urlContentType = urlContentType;
        return this;
    }

    public void setUrlContentType(String urlContentType) {
        this.urlContentType = urlContentType;
    }

    public Project getProject() {
        return project;
    }

    public Media project(Project project) {
        this.project = project;
        return this;
    }

    public void setProject(Project project) {
        this.project = project;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Media)) {
            return false;
        }
        return id != null && id.equals(((Media) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Media{" +
            "id=" + getId() +
            ", url='" + getUrl() + "'" +
            ", urlContentType='" + getUrlContentType() + "'" +
            "}";
    }
}
