package com.app.repository;
import com.app.domain.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Tag entity.
 */
@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {

    @Query(value = "select distinct tag from Tag tag left join fetch tag.projects",
        countQuery = "select count(distinct tag) from Tag tag")
    Page<Tag> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct tag from Tag tag left join fetch tag.projects")
    List<Tag> findAllWithEagerRelationships();

    @Query("select tag from Tag tag left join fetch tag.projects where tag.id =:id")
    Optional<Tag> findOneWithEagerRelationships(@Param("id") Long id);

}
