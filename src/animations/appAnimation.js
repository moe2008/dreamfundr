import gsap from "gsap";

export const appAnimation = () => {
    gsap.to(".SplineScene", {
        opacity: 1,
        duration: 2,
        ease: "back.in",
      });
      gsap.from(".btn", {
        y: 400,
        opacity: 0,
        duration: 2,
        ease: "back.in",
      });
      gsap.to(".btn", {
        y: 0,
        opacity: 1,
        duration: 2,
        ease: "back.in",
      });

      gsap.fromTo(
        ".brand",
        { opacity: 0, x: -400 },
        { opacity: 1, x: -100, duration: 2, delay: 0.5 }
      );

      gsap.fromTo(
        ".whitePaper",
        { opacity: 0, x: 400 },
        { opacity: 1, x: 0, delay: 1, duration: 2 }
      );
}