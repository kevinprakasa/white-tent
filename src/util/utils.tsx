export const formatRupiah = (angka: number, prefix = "") => {
  let number_string = angka.toString(),
    sisa = number_string.length % 3,
    rupiah = number_string.substr(0, sisa),
    ribuan = number_string.substr(sisa).match(/\d{3}/gi);

  if (ribuan) {
    const separator = sisa ? "." : "";
    rupiah += separator + ribuan.join(".");
  }

  return prefix === "" ? rupiah : prefix + rupiah;
};
