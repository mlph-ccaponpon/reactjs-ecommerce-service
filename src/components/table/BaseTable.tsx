import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { StyledButton } from '../../styles/global';
import { BaseTableContainer } from './BaseTable.elements';
import RatingInfo from '../info/RatingInfo';

const useStyles = makeStyles({
    root: {
      width: '100%'
    },
    container: {
      maxHeight: 600,
    },
    addBtn: {
        marginBottom: 20
    }
});

interface BaseTableProps {
    addBtnTitle?: string, 
    columns: any[],
    rows: any[],
    page: number,
    rowsPerPage: number,
    handleChangePage: (event: unknown, newPage: number) => void,
    handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleOpenAddModal?: () => void
};

export interface TableRowBtn{
    rowBtn: any,
    handleRowBtnClick: () => void
};

function BaseTable(props: BaseTableProps) {
    const classes = useStyles();
    
    return (
        <BaseTableContainer>
            {props.addBtnTitle && props.handleOpenAddModal && (
                <StyledButton className={classes.addBtn} onClick={props.handleOpenAddModal}>{props.addBtnTitle}</StyledButton>
            )}
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                            {props.columns.map((column) => (
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
                        {props.rows.slice(props.page * props.rowsPerPage, props.page * props.rowsPerPage + props.rowsPerPage).map((row, rowIndex) => {
                        return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                            {props.columns.map((column) => {
                                const value = row[column.id];
                                if(column.type === "button") {
                                    return (
                                        <TableCell key={column.id} align={column.align} onClick={() => column.buttonOnClick(row)}>
                                            {column.buttonElem}
                                        </TableCell>
                                    )
                                }
                                if(column.type === "rating") {
                                    return (
                                        <TableCell key={column.id} align={column.align}>
                                            <RatingInfo rating={column.value} />
                                        </TableCell>
                                    )
                                }
                                return (
                                <TableCell key={column.id} align={column.align}>
                                    {column.format && typeof value === 'number' ? column.format(value) : value}
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
                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                        component="div"
                        count={props.rows.length}
                        rowsPerPage={props.rowsPerPage}
                        page={props.page}
                        onChangePage={props.handleChangePage}
                        onChangeRowsPerPage={props.handleChangeRowsPerPage}
                    />
            </Paper>
        </BaseTableContainer>
    )
}

export default BaseTable;
