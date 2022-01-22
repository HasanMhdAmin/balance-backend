package com.example.balance.service;

import com.example.balance.model.Budget;

import java.util.List;

public interface BudgetService {

    // Add operation
    Budget saveBudget(Budget budget);

    // Read operation
    List<Budget> fetchAll();

    // Delete operation
    void deleteBudget(int id);

}
