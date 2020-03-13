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

export const addEmployeeSuccess = (employee) => {
    return {
        type : Types.ADD_EMPLOYEE_SUCCESS,
        employee
    }
}

export const addEmployeeFail = (msg) => {
    return {
        type : Types.ADD_EMPLOYEE_FAIL,
        msg
    }
}

// Delete Employee
export const deleteEmployee = (employeeId) => {
    return {
        type : Types.DELETE_EMPLOYEE,
        employeeId
    }
}

export const deleteEmployeeSuccess = (msg) => {
    return {
        type : Types.ADD_EMPLOYEE_SUCCESS,
        msg
    }
}

export const deleteEmployeeFail = (msg) => {
    return {
        type : Types.ADD_EMPLOYEE_FAIL,
        msg
    }
}

// Update Employee
export const updateEmployee = (employee) => {
    return {
        type : Types.UPDATE_EMPLOYEE,
        employee
    }
}

export const updateEmployeeSuccess = (msg) => {
    return {
        type : Types.UPDATE_EMPLOYEE_SUCCESS,
        msg
    }
}

export const updateEmployeeFail = (msg) => {
    return {
        type : Types.UPDATE_EMPLOYEE_FAIL,
        msg
    }
}