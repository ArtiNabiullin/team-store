// function getFiltered() {
//   let result = [...products];
//   const search = searchInput.value.toLowerCase().trim();
//   const category = categorySelect.value;
//   const sort = sortSelect.value;

//   if (search) {
//     result = result.filter((p) => p.name.toLowerCase().includes(search));
//   }

//   if (category !== "all") {
//     result = result.filter((p) => p.category === category);
//   }

//   if (sort === "asc") {
//     result.sort((a, b) => a.price - b.price);
//   } else if (sort === "desc") {
//     result.sort((a, b) => b.price - a.price);
//   }

//   return result;
// }

export function performFiltering(items, filters) {

}