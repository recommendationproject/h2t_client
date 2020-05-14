import * as Types from './constants';

// fetch employee
export const fetchEmployee = () => {
    return {
        type : Types.FETCH_EMPLOYEE
    }
}

export const fetchEmployeeSuccess = (listEmployee) => {
    return {
        type : Types.FETCH_EMPLOYEE_SUCCESS,
        listEmployee
    }
}

export const fetchEmployeeFail = (msg) => {
    return {
        type : Types.FETCH_EMPLOYEE_FAIL,
        msg
    }
}

// Add Employee
export const addEmployee = (employee) => {
    return {
        type : Types.ADD_EMPLOYEE,
        employee
    }
}

export const addEmployeeSuccess = (response) => {
    return {
        type : Types.ADD_EMPLOYEE_SUCCESS,
        response
    }
}

export const addEmployeeFail = (response) => {
    return {
        type : Types.ADD_EMPLOYEE_FAIL,
        response
    }
}

// Delete Employee
export const deleteEmployee = (employeeId) => {
    return {
        type : Types.DELETE_EMPLOYEE,
        employeeId
    }
}

export const deleteEmployeeSuccess = (response) => {
    return {
        type : Types.ADD_EMPLOYEE_SUCCESS,
        response
    }
}

export const deleteEmployeeFail = (response) => {
    return {
        type : Types.ADD_EMPLOYEE_FAIL,
        response
    }
}

// Update Employee
export const updateEmployee = (employee) => {
    return {
        type : Types.UPDATE_EMPLOYEE,
        employee
    }
}

export const updateEmployeeSuccess = (response) => {
    return {
        type : Types.UPDATE_EMPLOYEE_SUCCESS,
        response
    }
}

export const updateEmployeeFail = (response) => {
    return {
        type : Types.UPDATE_EMPLOYEE_FAIL,
        response
    }
}