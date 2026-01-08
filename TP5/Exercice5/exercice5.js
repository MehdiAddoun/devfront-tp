const nav = document.querySelector("header nav");

const navTop = nav.offsetTop;

const navHeight = nav.offsetHeight;

function updateSticky(){
    if(window.scrollY >= navTop){
        nav.classList.add("is-sticky");
        document.body.style.paddingTop = navHeight + "px";
    }else{
        nav.classList.remove("is-sticky");
        document.body.style.paddingTop = "0px";
    }
}

window.addEventListener("scroll", updateSticky);
window.addEventListener("resize", () => {
    document.body.style.paddingTop = "0px";
    nav.classList.remove("is-sticky");
    updateSticky();
});

updateSticky();
