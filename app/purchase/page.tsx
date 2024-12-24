"use client"

import * as React from "react"
import { styled } from "@mui/material/styles"
import { ChevronRight, PlusCircleIcon } from "lucide-react"
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion"
import MuiAccordionSummary, {
  AccordionSummaryProps,
  accordionSummaryClasses,
} from "@mui/material/AccordionSummary"
import MuiAccordionDetails from "@mui/material/AccordionDetails"
import Typography from "@mui/material/Typography"
import { useGetPurchaseQuery } from "../state/api"
import { LinearProgress } from "@mui/material"
import { currencyConvert } from "../helper"
import DetailTransaction from "./DetailTransaction"
import Header from "../(components)/Header"

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}))

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={
      <ChevronRight
        style={{
          fontSize: "0.9rem",
        }}
      />
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
    {
      transform: "rotate(90deg)",
    },
  [`& .${accordionSummaryClasses.content}`]: {
    marginLeft: theme.spacing(1),
  },
  ...theme.applyStyles("dark", {
    backgroundColor: "rgba(255, 255, 255, .05)",
  }),
}))

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}))

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState<string | false>("panel1")
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const { data: purchase, isLoading, isError } = useGetPurchaseQuery()

  if (isLoading) {
    return (
      <div>
        <LinearProgress />
      </div>
    )
  } else if (isError || !purchase) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch Purchase
      </div>
    )
  }

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false)
    }

  console.log("purchase = ", purchase)

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <Header name="Purchase List" />
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircleIcon className="w-5 h-5 mr-2 !text-gray-200" /> Create
          Purchase
        </button>
      </div>
      {!isLoading && purchase?.Data?.length
        ? purchase?.Data?.map((list) => (
            <div key={list?.Code}>
              <Accordion>
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <Typography sx={{ width: "50%", flexShrink: 0 }}>
                    {list?.Code}
                  </Typography>
                  <Typography
                    sx={{
                      width: "50%",
                      textAlign: "end",
                      color: "text.secondary",
                    }}
                  >
                    Rp. {currencyConvert(list?.Total)}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <DetailTransaction purchaseId={list?.Id} />
                </AccordionDetails>
              </Accordion>
            </div>
          ))
        : ""}
    </div>
  )
}
