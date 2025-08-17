package com.habittracker.habit_service.service;

import com.habittracker.habit_service.model.Habit;
import com.habittracker.habit_service.repository.HabitRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class HabitService {

    private final HabitRepository repo;

    public HabitService(HabitRepository repo) {
        this.repo = repo;
    }

    public List<Habit> findAll() {
        return repo.findAll();
    }

    public Habit create(Habit habit) {
        return repo.save(habit);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

    public Habit markComplete(Long id) {
        Habit h = repo.findById(id).orElseThrow();
        LocalDate today = LocalDate.now();

        if (h.getLastCompletedDate() == null) {
            h.setStreakCount(1);
        } else {
            long days = ChronoUnit.DAYS.between(h.getLastCompletedDate(), today);
            if (days == 1) {
                h.setStreakCount(h.getStreakCount() + 1); // consecutive day
            } else if (days > 1) {
                h.setStreakCount(1); // streak broken
            }
            // if days == 0, do nothing (already completed today)
        }

        h.setLastCompletedDate(today);
        return repo.save(h);
    }
}
