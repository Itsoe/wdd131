const reviewCount = Number(localStorage.getItem("reviewCount")) || 0;
const updatedReviewCount = reviewCount + 1;

localStorage.setItem("reviewCount", updatedReviewCount);
document.querySelector("#review-count").textContent = updatedReviewCount;

document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modified: ${document.lastModified}`;
