import * as React from "react";

import icons from "glyphicons";
import { Button } from "@mui/material";
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
      backgroundColor: ColorCodes.LogoBackground,
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
            <StyledTableCell align="right">
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
                <TableCell align="right">
                  <Button onClick={() => props.deleteHandler(index)}>
                    {icons.cancel}
                  </Button>
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
