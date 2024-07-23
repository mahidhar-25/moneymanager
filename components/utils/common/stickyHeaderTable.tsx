import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import CircleWithText from "./circleWithText";

interface Column {
    id: "name" | "serialNo" | "time" | "principal" | "interest";
    label: string;
    minWidth?: number;
    align?: "right";
    format?: (value: number) => string;
    circle?: boolean;
    circleColor?: string;
}

const columns: readonly Column[] = [
    { id: "serialNo", label: "S.No", minWidth: 170 },
    { id: "name", label: "Name", minWidth: 100 },
    {
        id: "principal",
        label: "Principal",
        minWidth: 170,
        format: (value: number) => value.toLocaleString("en-US"),
        circle: true,
        circleColor: "#15f554",
    },
    {
        id: "interest",
        label: "Interest",
        minWidth: 170,
        format: (value: number) => value.toLocaleString("en-US"),
        circle: true,
        circleColor: "#fc3a44",
    },
    {
        id: "time",
        label: "Time",
        minWidth: 170,
        circle: true,
        circleColor: "#2dcbee",
    },
];

interface Data {
    serialNo: string | number;
    name: string;
    principal: number;
    interest: number;
    time: string;
}

function createData(
    serialNo: number,
    name: string,
    principal: number,
    interest: number,
    time: string
): Data {
    return { serialNo, name, principal, interest, time };
}

const rows = [
    createData(1, "India", 200000, 1324171354, "1y 2m 20d"),
    createData(2, "China", 200000, 1403500365, "1y 2m 20d"),
    createData(3, "Italy", 200000, 60483973, "1y 2m 20d"),
    createData(4, "United States", 200000, 327167434, "1y 2m 20d"),
    createData(5, "Canada", 200000, 37602103, "1y 2m 20d"),
    createData(6, "Australia", 200000, 25475400, "1y 2m 20d"),
    createData(7, "Germany", 200000, 83019200, "1y 2m 20d"),
    createData(8, "Ireland", 200000, 4857000, "1y 2m 20d"),
    createData(9, "Mexico", 200000, 126577691, "1y 2m 20d"),
    createData(10, "Japan", 200000, 126317000, "1y 2m 20d"),
    createData(11, "France", 200000, 67022000, "1y 2m 20d"),
    createData(12, "United Kingdom", 200000, 67545757, "1y 2m 20d"),
    createData(13, "Russia", 200000, 146793744, "1y 2m 20d"),
];

export default function StickyHeadTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(7);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((row) => {
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.serialNo}
                                    >
                                        {columns.map((column) => {
                                            const value = row[column.id];

                                            if (column.circle) {
                                                return (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                    >
                                                        <CircleWithText
                                                            color={
                                                                column.circleColor
                                                            }
                                                            customClass="w-3 h-3"
                                                            text={value}
                                                        />
                                                    </TableCell>
                                                );
                                            }
                                            return (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                >
                                                    {column.format &&
                                                    typeof value === "number"
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
