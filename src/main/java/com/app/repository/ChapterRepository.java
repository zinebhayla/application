package com.app.repository;
import com.app.domain.Chapter;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Chapter entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ChapterRepository extends JpaRepository<Chapter, Long> {

}
