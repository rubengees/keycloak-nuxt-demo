package com.rubengees.sample

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/todos")
class TodoController {

    @GetMapping
    fun todos(): List<String> {
        return listOf("A", "B", "C")
    }
}
