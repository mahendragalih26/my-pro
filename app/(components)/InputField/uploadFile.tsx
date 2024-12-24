import * as React from "react"
import { styled } from "@mui/material/styles"
import Button from "@mui/material/Button"
import { CloudUpload } from "lucide-react"

interface Props {
  setValue?: (val: any) => void
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
  display: "none",
  opacity: "0",
  color: "transparent",
})

const UploadFile: React.FC<Props> = ({ setValue = (val: any) => ({}) }) => {
  const [tmpFileName, settmpFileName] = React.useState("")

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] // Access the first selected file
    if (file) {
      settmpFileName(file.name) // Get the file name
    } else {
      settmpFileName("") // Reset file name if no file is selected
    }
  }

  return (
    <>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUpload />}
        className=""
      >
        Upload files
        <VisuallyHiddenInput
          type="file"
          onChange={(event) => {
            setValue(event.target.files)
            handleFileChange(event)
          }}
          multiple
        />
      </Button>
      <div className="my-2">
        {" "}
        {tmpFileName && <p>Selected file: {tmpFileName}</p>}
      </div>
    </>
  )
}

export default UploadFile
