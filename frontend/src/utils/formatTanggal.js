export const convertDateDBtoIndo = (string) => {
  let bulanIndo = [
    "",
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  let tanggal = string.split("-")[2];
  let bulan = string.split("-")[1];
  let tahun = string.split("-")[0];

  return tanggal + " " + bulanIndo[Math.abs(bulan)] + " " + tahun;
};
