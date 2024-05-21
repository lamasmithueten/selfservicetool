# Self service tool

## Project Overview

This is a college project for Software Engineering. It implements a comprehensive system for employee management and resource allocation, including registration/login processes, leave application and approval workflows, and virtual environment provisioning processes. The system offers different views and functionalities based on user roles (Employee and Management).

## Table of Contents

- [Features](#features)
  - [Registration/Login Process](#registrationlogin-process)
  - [Leave Process](#leave-process)
    - [Employee View](#employee-view)
    - [Management View](#management-view)
  - [Provisioning Process](#provisioning-process)
    - [Employee View](#employee-view-1)
    - [Management View](#management-view-1)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

### Registration/Login Process

- Users can register with a username/email, password, and role (Employee or Management).
- After registration, a registration request is sent which admins can accept/decline.
- The views and functionalities differ based on the user’s role.

### Leave Process

#### Employee View

- View available leave days.
- View a list of leave applications and their approval status.
- Submit new leave applications with the following details:
  - Number of leave days
  - Leave period

#### Management View

- View a list of currently submitted leave applications from all employees with the following details:
  - Available leave days
  - Requested leave days and their period
- View a list of currently submitted registration requests with the following details:
  - Username
  - First and last name
  - E-Mail
  - Role
- Approve or reject leave applications with a reason.

### Provisioning Process

#### Employee View

- View currently available virtual environments (IP address, username, password).
- View requests for new virtual environments and their approval status.
- Submit a new request for a virtual environment with the following details:
  - Select the type of virtual environment (e.g., Windows Server, Windows 11, etc.)
  - Purpose of the virtual environment (e.g., Development for client XY)

#### Management View

- View a list of currently submitted requests for virtual environments with the following details:
  - Requested virtual environment and its purpose
- Approve or reject the requests with a reason.
- Conduct technical approvals (external services are called here).
- Provision virtual environments (external services are called, and access credentials are generated).
