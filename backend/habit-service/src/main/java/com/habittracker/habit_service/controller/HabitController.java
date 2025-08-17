package com.habittracker.habit_service.controller;

import com.habittracker.habit_service.model.Habit;
import com.habittracker.habit_service.service.HabitService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/habits")
@CrossOrigin(origins = "http://localhost:5173") // allow Vite dev server
public class HabitController {

    private final HabitService service;

    public HabitController(HabitService service) {
        this.service = service;
    }

    @GetMapping
    public List<Habit> all() {
        return service.findAll();
    }

    @PostMapping
    public Habit create(@RequestBody Habit habit) {
        return service.create(habit);
    }

    @PutMapping("/{id}/complete")
    public Habit complete(@PathVariable Long id) {
        return service.markComplete(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
