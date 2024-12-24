// Change number to currency
export const currencyConvert = (val: any) => {
  let curr: any = 0
  let handleVal = val ?? 0
  if (handleVal.toString().includes(".")) {
    let num = handleVal.toString().split(".")
    let firstLine = handleVal
      ? num[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      : "0"
    curr = firstLine + "," + num[1].substring(0, 4)
  } else {
    curr = handleVal
      ? handleVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      : "0"
  }
  return curr
}

// FORMAT CURRENCY Rupiah
export function formatRupiah(amount: string, prefix?: string): string {
  // Remove any characters except digits, commas, and periods
  const numberString = amount.replace(/[^0-9.,]/g, "")

  // Split the integer and decimal parts
  const [integerPart, decimalPart] = numberString.split(/[,.]/)

  // Format the integer part with thousand separators
  const sisa = integerPart.length % 3
  let rupiah = integerPart.substring(0, sisa)
  const ribuan = integerPart.substring(sisa).match(/\d{3}/g)

  if (ribuan) {
    const separator = sisa ? "." : ""
    rupiah += separator + ribuan.join(".")
  }

  // Only add the decimal part if it exists in the input
  if (decimalPart !== undefined) {
    const formattedDecimalPart =
      decimalPart.length === 1 ? `${decimalPart}0` : decimalPart.substring(0, 2)
    rupiah += `,${formattedDecimalPart}`
  }

  // return prefix ? `${prefix} ${rupiah}` : rupiah;
  return prefix === undefined ? rupiah : rupiah ? `${prefix} ${rupiah}` : ""
}

export const filterCharacter = (e: any) => {
  if (
    e.code.includes("Digit") ||
    e.code === "KeyE" ||
    e.keyCode == 37 ||
    e.keyCode == 39 ||
    e.keyCode == 8
  ) {
    return true
  } else {
    e.preventDefault()
    return false
  }
}

export const numbersOnly = (e: any) => {
  const charCode = e.which || e.keyCode

  if (
    (charCode > 47 && charCode < 58) ||
    charCode == 37 ||
    charCode == 39 ||
    charCode == 8
  ) {
    return true
  }

  e.preventDefault()
  return false
}
