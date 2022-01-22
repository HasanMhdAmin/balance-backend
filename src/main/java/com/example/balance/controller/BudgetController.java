package com.example.balance.controller;


import com.example.balance.model.Budget;
import com.example.balance.service.BudgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
public class BudgetController extends BaseController {


    @Autowired
    private BudgetService budgetService;

    @RequestMapping(value = "/budget", method = GET)
    public List<Budget> getArticlesByCategory() {

        return budgetService.fetchAll();

    }

    @PostMapping("/budget")
    public Budget saveDepartment(@RequestBody Budget budget)
    {
        return budgetService.saveBudget(budget);
    }

}
