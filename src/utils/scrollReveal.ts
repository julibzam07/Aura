/**
 * Scroll Reveal Engine
 * Designed for AURA - replicates luxury smooth cinematographic motion
 * Inspired by: https://miami.mercedesbenzplaces.com/es/
 */

export function initScrollReveal() {
  if (typeof window === "undefined") return;

  // 1. Accessibility Checks: Respect prefers-reduced-motion
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Query all elements configured with data-reveal attribute
  const selectors = "[data-reveal], [data-parallax]";
  
  const setupElement = (el: HTMLElement) => {
    if (el.dataset.revealSetup === "true") return;
    el.dataset.revealSetup = "true";

    // Set custom transition duration and delay if provided, else use default
    const delay = el.getAttribute("data-reveal-delay") || "0";
    const pattern = el.getAttribute("data-reveal");
    const defaultDuration = (pattern === "slide-in-left" || pattern === "slide-in-right")
      ? "1100"
      : (pattern === "scale-in" ? "1200" : "900");
    const duration = el.getAttribute("data-reveal-duration") || defaultDuration;

    if (prefersReduced) {
      // Respect user system preferences: fast, simple fade-only
      el.style.transition = "opacity 250ms ease-out";
      el.style.transitionDelay = `${delay}ms`;
      if (!el.classList.contains("revealed")) {
        el.style.opacity = "0";
      }
      return;
    }

    // Determine translation offset depending on screen size
    const isMobile = window.innerWidth <= 768;
    const defaultY = isMobile ? "15px" : "30px";
    const computedDuration = isMobile ? `${Math.round(parseInt(duration) * 0.75)}` : duration;

    // Apply initial state styles safely to avoid layout shifts or flickering before JS loads
    el.style.transition = `opacity ${computedDuration}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${computedDuration}ms cubic-bezier(0.16, 1, 0.3, 1)`;
    el.style.transitionDelay = `${delay}ms`;

    if (!el.classList.contains("revealed")) {
      el.style.opacity = "0";
      if (pattern === "fade-up") {
        el.style.transform = `translateY(${defaultY})`;
      } else if (pattern === "scale-in") {
        el.style.transform = "scale(1.06)";
      } else if (pattern === "slide-in-left") {
        if (isMobile) {
          el.style.transform = `translateY(${defaultY})`;
        } else {
          el.style.transform = "translateX(-60px)";
        }
      } else if (pattern === "slide-in-right") {
        if (isMobile) {
          el.style.transform = `translateY(${defaultY})`;
        } else {
          el.style.transform = "translateX(60px)";
        }
      }
    }
  };

  const revealElement = (el: HTMLElement) => {
    if (el.classList.contains("revealed")) return;

    // Set will-change for performance optimization only during active transition
    el.style.willChange = "opacity, transform";
    
    // Trigger transition by applying CSS class and resetting visual transforms
    el.classList.add("revealed");
    el.style.opacity = "1";
    el.style.transform = "none";

    // Clean will-change from memory upon animation completion to free GPU layers
    const durationAttr = el.getAttribute("data-reveal-duration") || "900";
    const delayAttr = el.getAttribute("data-reveal-delay") || "0";
    const totalTime = parseInt(durationAttr) + parseInt(delayAttr);

    setTimeout(() => {
      el.style.willChange = "";
    }, totalTime + 100);
  };

  const resetElement = (el: HTMLElement) => {
    // EXCLUSIÓN: El video o elementos de la cabecera (HERO) no se re-animan.
    // También permitimos excluir selectivamente elementos con data-reveal-once="true".
    if (el.closest("#hero") || el.getAttribute("data-reveal-once") === "true") return;

    if (!el.classList.contains("revealed")) return;

    // Set will-change during the exit transition as well
    el.style.willChange = "opacity, transform";

    const pattern = el.getAttribute("data-reveal");
    const isMobile = window.innerWidth <= 768;
    const defaultY = isMobile ? "15px" : "30px";

    el.classList.remove("revealed");
    el.style.opacity = "0";

    if (pattern === "fade-up") {
      el.style.transform = `translateY(${defaultY})`;
    } else if (pattern === "scale-in") {
      el.style.transform = "scale(1.06)";
    } else if (pattern === "slide-in-left") {
      if (isMobile) {
        el.style.transform = `translateY(${defaultY})`;
      } else {
        el.style.transform = "translateX(-60px)";
      }
    } else if (pattern === "slide-in-right") {
      if (isMobile) {
        el.style.transform = `translateY(${defaultY})`;
      } else {
        el.style.transform = "translateX(60px)";
      }
    }

    // Clean will-change after reset transition completes
    const durationAttr = el.getAttribute("data-reveal-duration") || "900";
    const delayAttr = el.getAttribute("data-reveal-delay") || "0";
    const totalTime = parseInt(durationAttr) + parseInt(delayAttr);

    setTimeout(() => {
      el.style.willChange = "";
    }, totalTime + 100);
  };

  // Initial setup of currently loaded DOM elements
  const elements = Array.from(document.querySelectorAll(selectors)) as HTMLElement[];
  
  // Identify items that are above-the-fold immediately on startup to protect LCP / SEO
  const initialScrollY = window.scrollY;
  elements.forEach((el) => {
    setupElement(el);
    
    // If above index page fold at page-load time, reveal instantly without transition fatigue
    if (initialScrollY === 0) {
      const rect = el.getBoundingClientRect();
      const isAboveFold = rect.top >= 0 && rect.top < window.innerHeight;
      if (isAboveFold) {
        revealElement(el);
      }
    }
  });

  // 2. IntersectionObserver configuration with progressive thresholds
  const computedThreshold = window.innerWidth <= 768 ? 0.08 : 0.15;

  const observerCallback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      const el = entry.target as HTMLElement;
      
      // Entra a animado cuando es visible al menos el threshold configurado (15% en desktop, 8% en mobile)
      if (entry.isIntersecting && entry.intersectionRatio >= computedThreshold) {
        revealElement(el);
      } 
      // Vuelve a estado inicial sólo cuando deja de ser visible por completo (isIntersecting === false)
      // NOTA EXPLICATIVA SOBRE EL REMOVED UNOBSERVE:
      // Anteriormente se ejecutaba 'self.unobserve(el)' tras la primera intersección para un reveal de una única vez.
      // Se eliminó para mantener el observer activo indefinidamente y permitir la re-animación continua del viewport.
      else if (!entry.isIntersecting) {
        resetElement(el);
      }
    });
  };

  // Usamos un rootMargin negativo para el tope inferior para evitar parpadeos,
  // y dos thresholds: 0 (salir por completo) y computedThreshold (entrar con volumen de visibilidad óptimo).
  const observer = new IntersectionObserver(observerCallback, {
    root: null,
    rootMargin: "0px 0px -10% 0px",
    threshold: [0, computedThreshold],
  });

  // Observe all reveal elements
  elements.forEach((el) => {
    observer.observe(el);
  });

  // 3. MutationObserver for dynamic, lazy-loaded components or state changes (e.g. view switches in SPA)
  const mutationObserver = new MutationObserver((mutations) => {
    let needsObserve = false;
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node instanceof HTMLElement) {
          const targets = node.querySelectorAll(selectors);
          targets.forEach((target) => {
            const el = target as HTMLElement;
            setupElement(el);
            observer.observe(el);
            needsObserve = true;
          });
          
          if (node.matches(selectors)) {
            setupElement(node);
            observer.observe(node);
            needsObserve = true;
          }
        }
      });
    });
  });

  mutationObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // 4. Subtle Parallax Effect for dedicated HERO elements (ratio 0.3)
  const parallaxElements = Array.from(document.querySelectorAll("[data-parallax]")) as HTMLElement[];
  let animationFrameId: number;

  const handleParallax = () => {
    if (prefersReduced) return;
    const sysScrollY = window.scrollY;
    
    parallaxElements.forEach((el) => {
      const parent = el.parentElement;
      if (!parent) return;
      
      const parentRect = parent.getBoundingClientRect();
      const isVisibleCount = parentRect.top < window.innerHeight && parentRect.bottom > 0;
      
      if (isVisibleCount) {
        // Calculate sutil translate offset ratio
        const relativeOffset = (window.innerHeight - parentRect.top) * 0.15;
        el.style.transform = `translateY(${relativeOffset}px)`;
        // Optional scale to avoid bottom boundary gap
        if (el.dataset.parallaxScale === "true") {
          el.style.transform += " scale(1.12)";
        }
      }
    });
    
    animationFrameId = requestAnimationFrame(handleParallax);
  };

  if (parallaxElements.length > 0 && !prefersReduced) {
    // Setup parallax items with optimized layout style
    parallaxElements.forEach((el) => {
      el.style.willChange = "transform";
      el.style.transition = "transform 0.1s cubic-bezier(0.16, 1, 0.3, 1)";
    });
    animationFrameId = requestAnimationFrame(handleParallax);
  }

  // Return clean cleanup routine
  return () => {
    observer.disconnect();
    mutationObserver.disconnect();
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
  };
}
