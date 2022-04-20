export default function changeSortOrder(columnName, so, setSo) {
    if (columnName === so.by) {
        if (so.order === "asc") {
            setSo({ by: columnName, order: "desc" });
        } else {
            setSo({ by: columnName, order: "asc" });
        }
    } else {
        setSo({ by: columnName, order: "asc" });
    }
}
