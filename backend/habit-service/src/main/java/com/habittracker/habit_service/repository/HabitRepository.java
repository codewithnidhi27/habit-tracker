package com.habittracker.habit_service.repository;

import com.habittracker.habit_service.model.Habit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HabitRepository extends JpaRepository<Habit, Long> {
}
