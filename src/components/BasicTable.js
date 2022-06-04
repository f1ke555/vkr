import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import GlobalStyles from '@mui/material/GlobalStyles'


function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);



    return (
        <React.Fragment>
            <TableRow className='table-deep-body' sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        className='icon-table-button'
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell className='table-deep-body' component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="right">{row.views}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell  style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography style={{
                                color: '#fff',
                                fontFamily: 'Montserrat',
                                fontStyle: 'normal',
                                fontWeight: '700',
                                fontSize: '16px',
                                lineHeight: '85%',
                            }} variant="h6" gutterBottom component="div">
                                Метрики
                            </Typography>
                            <Table  size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Id</TableCell>
                                        <TableCell>gameID</TableCell>
                                        <TableCell align="right">Название метрики</TableCell>
                                        <TableCell align="right">Дата</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody  className="table-deep-body">
                                    {row.metrics.map((metricsRow) => (
                                        <TableRow key={metricsRow.date}>
                                            <TableCell component="th" scope="row">
                                                {metricsRow.id}
                                            </TableCell>
                                            <TableCell>{metricsRow.gameId}</TableCell>
                                            <TableCell align="right">{metricsRow.name}</TableCell>
                                            <TableCell align="right">
                                                {metricsRow.timeDate}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        calories: PropTypes.number.isRequired,
        carbs: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        history: PropTypes.arrayOf(
            PropTypes.shape({
                amount: PropTypes.number.isRequired,
                customerId: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired,
            }),
        ).isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        protein: PropTypes.number.isRequired,
    }).isRequired,
};

const style = {
    backgroundColor: '#49155E',
}

export default function CollapsibleTable(props) {
    return (
        <>
            <TableContainer sx={style} component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead className="table-head">
                        <TableRow>
                            <TableCell/>
                            <TableCell>Название игры</TableCell>
                            <TableCell align="right">Просмотры</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody  className="table-head-body">
                        {props.metrics.map((row) => (
                            <Row key={row.name} row={row.game} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
