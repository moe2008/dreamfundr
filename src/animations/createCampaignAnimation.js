import gsap from "gsap";

export const createCampaignAnimation = () => {
  gsap.from(".btn", {
    y: 400,
    opacity: 0,
    ease: "back.in",
  });
  gsap.to(".btn", {
    y: 0,
    opacity: 1,
    duration: 1.5,
    ease: "back.in",
  });
  gsap.fromTo(
    ".createCampaignHeaderWrapper",
    { opacity: 0, x: 100 },
    { opacity: 1, x: 0, duration: 1 }
  );
  gsap.fromTo(
    ".inputAnim",
    { opacity: 0, x: 100 },
    { opacity: 1, x: 0, duration: 0.5, stagger: 0.5 }
  );
};
