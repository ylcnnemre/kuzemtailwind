enum Permission {
    all = "all",
    STUDENT_SHOW = "student_show",
    STUDENT_EDIT = "student_edit",
    STUDENT_DELETE = "student_delete",
    STUDENT_ADD = "student_add",
    TEACHER_SHOW = "teacher_show",
    TEACHER_EDIT = "teacher_edit",
    TEACHER_ADD = "teacher_add",
    TEACHER_DELETE = "teacher_delete",
    ADMIN_SHOW = "admin_show",
    ADMIN_EDIT = "admin_edit",
    ADMIN_DELETE = "admin_delete",
    ADMIN_ADD = "admin_add",
    BRANCH_SHOW = "branch_show",
    BRANCH_EDIT = "branch_edit",
    BRANCH_DELETE = "branch_delete",
    BRANCH_ADD = "branch_add",
    COURSE_SHOW = "course_show",
    COURSE_EDIT = "course_edit",
    COURSE_DELETE = "course_delete",
    COURSE_ADD = "course_add",
    SEMESTER_ADD = "semester_add",
    SEMESTER_EDIT = "semester_edit",
    SEMESTER_DELETE = "semester_delete",
    SEMESTER_SHOW = "semester_show"
}

// Enum kullanımı
const permission: Permission[] = [
    Permission.STUDENT_SHOW,
    Permission.STUDENT_EDIT,
    Permission.STUDENT_DELETE,
    Permission.TEACHER_SHOW,
    Permission.TEACHER_EDIT,
    Permission.TEACHER_DELETE,
    Permission.ADMIN_SHOW,
    Permission.ADMIN_EDIT,
    Permission.ADMIN_DELETE,
    Permission.BRANCH_SHOW,
    Permission.BRANCH_EDIT,
    Permission.BRANCH_DELETE,
    Permission.COURSE_EDIT
];

export {
    Permission
}