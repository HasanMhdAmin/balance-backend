package com.example.balance.service;

import com.example.balance.model.Budget;
import com.example.balance.repository.BudgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BudgetServiceImpl implements BudgetService {

    @Autowired
    private BudgetRepository budgetRepository;

    @Override
    public Budget saveBudget(Budget budget) {
        return budgetRepository.save(budget);
    }

    @Override
    public List<Budget> fetchAll() {
        return budgetRepository.findAll();
    }

    @Override
    public void deleteBudget(int id) {
        budgetRepository.deleteById(id);
    }
}
