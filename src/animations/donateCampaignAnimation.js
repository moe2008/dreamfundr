import gsap from "gsap";

export const donateCampaignAnimation = () => {
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
    ".DonateCampaignHeaderWrapper",
    { opacity: 0, x: 100 },
    { opacity: 1, x: 0, duration: 1 }
  );

  gsap.fromTo(
    ".inputAnimation",
    { opacity: 0, x: 100 },
    { opacity: 1, x: 0, duration: 0.5, stagger: 0.5 }
  );

  gsap.fromTo(
    ".goalAnim",
    { opacity: 0, y: 100 },
    { opacity: 1, y: 0, duration: 0.5, stagger: 0.5 }
  );
};
