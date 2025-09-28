import * as React from "react";

import icons from "glyphicons";
import { Button, Tooltip } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { ColorCodes } from "../common/constants";
import { useTranslation } from "react-i18next";

const ViewData = (props) => {
  const { t } = useTranslation();

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: ColorCodes.HeaderBackground,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: ColorCodes.RowHighlighter,
    },
  }));

  const actionButton = (from, to, amount, index) => {
    if (from == "Income" && to == "Expense") {
      return (
        <>
          <Tooltip title={t("errorMessages.editNotAllowed")}>
            <span>
              <Button disabled>{icons.edit}</Button>
            </span>
          </Tooltip>
          |
          <Tooltip title={t("errorMessages.deleteNotAllowed")}>
            <span>
              <Button disabled>{icons.cancel}</Button>
            </span>
          </Tooltip>
        </>
      );
    }

    return (
      <>
        <Button onClick={() => props.editHandler(from, to, amount)}>
          {icons.edit}
        </Button>
        |
        <Button onClick={() => props.deleteHandler(from, to, amount)}>
          {icons.cancel}
        </Button>
      </>
    );
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>{t("fields.From")}</StyledTableCell>
            <StyledTableCell>{t("fields.To")}</StyledTableCell>
            <StyledTableCell align="right">
              {t("fields.Amount")}
            </StyledTableCell>
            <StyledTableCell align="center">
              {t("fields.Action")}
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row, index) => {
            if (index === 0) return;
            return (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {row[0]}
                </StyledTableCell>
                <StyledTableCell>{row[1]}</StyledTableCell>
                <StyledTableCell align="right">{row[2]}</StyledTableCell>
                <TableCell align="center">
                  {actionButton(row[0], row[1], row[2], index)}
                </TableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ViewData;
