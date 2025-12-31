"use client";

import { motion, useSpring } from "framer-motion";
import { FC, JSX, useEffect, useRef, useState } from "react";

// Utility function 'cn' (classnames) - implemented directly to resolve import error
function cn(...inputs: (string | undefined | null | boolean)[]) {
    return inputs.filter(Boolean).join(" ");
}

interface Position {
    x: number;
    y: number;
}

export interface SpringConfig {
    damping: number;
    stiffness: number;
    mass: number;
    restDelta: number;
}

export interface SmoothCursorProps {
    cursor?: JSX.Element;
    springConfig?: SpringConfig;
    className?: string;
    size?: number;
    color?: string;
    hideOnLeave?: boolean;
    trailLength?: number;
    showTrail?: boolean;
    rotateOnMove?: boolean;
    scaleOnClick?: boolean;
    glowEffect?: boolean;
    magneticDistance?: number;
    magneticElements?: string;
    onCursorMove?: (position: Position) => void;
    onCursorEnter?: () => void;
    onCursorLeave?: () => void;
    disabled?: boolean;
}

const DefaultCursorSVG: FC<{ size?: number; color?: string; className?: string }> = ({
    size = 25,
    color = "#ea580c",
    className
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size * 2.4}
            height={size * 2.6}
            viewBox="0 0 60 65"
            fill="none"
            className={cn("pointer-events-none", className)}
        >
            <defs>
                {/* Main orange gradient for ceramic spoon */}
                <linearGradient id="chinese-spoon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fb923c" />
                    <stop offset="30%" stopColor={color} />
                    <stop offset="60%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#ea580c" />
                </linearGradient>

                {/* Glossy highlight gradient */}
                <radialGradient id="glossy-highlight" cx="35%" cy="25%">
                    <stop offset="0%" stopColor="white" stopOpacity="0.95" />
                    <stop offset="40%" stopColor="white" stopOpacity="0.6" />
                    <stop offset="70%" stopColor={color} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={color} stopOpacity="0" />
                </radialGradient>

                {/* Ceramic texture gradient */}
                <linearGradient id="ceramic-texture" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#fff" stopOpacity="0.4" />
                    <stop offset="50%" stopColor="#fff" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#000" stopOpacity="0.15" />
                </linearGradient>

                {/* Handle gradient */}
                <linearGradient id="handle-orange" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#fb923c" />
                    <stop offset="50%" stopColor={color} />
                    <stop offset="100%" stopColor="#c2410c" />
                </linearGradient>

                {/* Inner bowl shadow */}
                <radialGradient id="bowl-shadow" cx="50%" cy="50%">
                    <stop offset="0%" stopColor="#000" stopOpacity="0" />
                    <stop offset="70%" stopColor="#000" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#000" stopOpacity="0.25" />
                </radialGradient>

                {/* Drop shadow filter */}
                <filter id="chinese-spoon-shadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="2.5" />
                    <feOffset dx="1" dy="3" result="offsetblur" />
                    <feComponentTransfer>
                        <feFuncA type="linear" slope="0.4" />
                    </feComponentTransfer>
                    <feMerge>
                        <feMergeNode />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>

                {/* Glow effect */}
                <filter id="orange-glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            <g filter="url(#chinese-spoon-shadow)">
                {/* Chinese Soup Spoon Bowl - Wide, flat, rounded shape */}
                <path
                    d="M 15 12 Q 15 8, 18 6 L 42 6 Q 45 8, 45 12 L 45 22 Q 45 28, 39 28 L 21 28 Q 15 28, 15 22 Z"
                    fill="url(#chinese-spoon-gradient)"
                    stroke="#c2410c"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                />

                {/* Inner bowl depth shadow */}
                <ellipse
                    cx="30"
                    cy="17"
                    rx="12"
                    ry="9"
                    fill="url(#bowl-shadow)"
                />

                {/* Ceramic texture overlay */}
                <path
                    d="M 17 12 Q 17 9, 19 7 L 41 7 Q 43 9, 43 12 L 43 22 Q 43 26, 39 26 L 21 26 Q 17 26, 17 22 Z"
                    fill="url(#ceramic-texture)"
                    opacity="0.6"
                />

                {/* Main glossy highlight on bowl */}
                <ellipse
                    cx="25"
                    cy="13"
                    rx="10"
                    ry="7"
                    fill="url(#glossy-highlight)"
                    transform="rotate(-15 25 13)"
                />

                {/* Secondary shine spot */}
                <ellipse
                    cx="38"
                    cy="18"
                    rx="5"
                    ry="4"
                    fill="white"
                    opacity="0.5"
                    transform="rotate(20 38 18)"
                />

                {/* Small highlight for extra shine */}
                <ellipse
                    cx="22"
                    cy="10"
                    rx="3"
                    ry="2.5"
                    fill="white"
                    opacity="0.8"
                />

                {/* Spoon Handle - Tapered, elegant */}
                <path
                    d="M 27 27 Q 27 29, 27.5 31 L 28 56 Q 28 61, 30 61 Q 32 61, 32 56 L 32.5 31 Q 33 29, 33 27 Z"
                    fill="url(#handle-orange)"
                    stroke="#c2410c"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                />

                {/* Handle highlight */}
                <path
                    d="M 29 31 L 29 56 Q 29 59, 30 59 Q 31 59, 31 56 L 31 31"
                    fill="white"
                    opacity="0.35"
                />

                {/* Handle edge shadow for depth */}
                <path
                    d="M 32 31 L 32 56 Q 32 60, 30 60"
                    stroke="#9a3412"
                    strokeWidth="0.8"
                    fill="none"
                    opacity="0.6"
                />

                {/* Connection detail between bowl and handle */}
                <ellipse
                    cx="30"
                    cy="28"
                    rx="4"
                    ry="2.5"
                    fill="url(#handle-orange)"
                    stroke="#c2410c"
                    strokeWidth="1"
                />

                {/* Bowl rim highlight */}
                <path
                    d="M 18 6 Q 18 8, 18 10 L 18 22 Q 18 26, 21 26 L 39 26 Q 42 26, 42 22 L 42 10 Q 42 8, 42 6"
                    fill="none"
                    stroke="white"
                    strokeWidth="1.2"
                    opacity="0.5"
                    strokeLinecap="round"
                />

                {/* Bottom rim shadow */}
                <path
                    d="M 21 27 Q 15 27, 15 22 L 15 20 Q 15 24, 21 24 L 39 24 Q 45 24, 45 20 L 45 22 Q 45 27, 39 27 Z"
                    fill="#000"
                    opacity="0.15"
                />

                {/* Outer glow for orange effect */}
                <path
                    d="M 15 12 Q 15 8, 18 6 L 42 6 Q 45 8, 45 12 L 45 22 Q 45 28, 39 28 L 21 28 Q 15 28, 15 22 Z"
                    fill="none"
                    stroke={color}
                    strokeWidth="0.8"
                    opacity="0.4"
                    filter="url(#orange-glow)"
                />

                {/* Decorative pattern lines (optional Asian detail) */}
                <path
                    d="M 20 15 Q 30 14, 40 15"
                    stroke="#fff"
                    strokeWidth="0.5"
                    opacity="0.3"
                    fill="none"
                    strokeLinecap="round"
                />
                <path
                    d="M 20 20 Q 30 19, 40 20"
                    stroke="#fff"
                    strokeWidth="0.5"
                    opacity="0.3"
                    fill="none"
                    strokeLinecap="round"
                />
            </g>
        </svg>
    );
};

export function SmoothCursor({
    cursor,
    springConfig = {
        damping: 45,
        stiffness: 400,
        mass: 1,
        restDelta: 0.001,
    },
    className,
    size = 25,
    color = "black",
    hideOnLeave = true,
    trailLength = 5,
    showTrail = false,
    rotateOnMove = true,
    scaleOnClick = true,
    glowEffect = false,
    magneticDistance = 50,
    magneticElements = "[data-magnetic]",
    onCursorMove,
    onCursorEnter,
    onCursorLeave,
    disabled = false,
}: SmoothCursorProps) {
    const [isMoving, setIsMoving] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isClicking, setIsClicking] = useState(false);
    const [trail, setTrail] = useState<Position[]>([]);

    const lastMousePos = useRef<Position>({ x: 0, y: 0 });
    const velocity = useRef<Position>({ x: 0, y: 0 });
    const lastUpdateTime = useRef(Date.now());
    const previousAngle = useRef(0);
    const accumulatedRotation = useRef(0);

    const cursorX = useSpring(0, springConfig);
    const cursorY = useSpring(0, springConfig);
    const rotation = useSpring(0, {
        ...springConfig,
        damping: 60,
        stiffness: 300,
    });
    const scale = useSpring(1, {
        ...springConfig,
        stiffness: 500,
        damping: 35,
    });

    const defaultCursor = <DefaultCursorSVG size={size} color={color} />;
    const cursorElement = cursor || defaultCursor;

    useEffect(() => {
        if (disabled) return;

        const updateVelocity = (currentPos: Position) => {
            const currentTime = Date.now();
            const deltaTime = currentTime - lastUpdateTime.current;

            if (deltaTime > 0) {
                velocity.current = {
                    x: (currentPos.x - lastMousePos.current.x) / deltaTime,
                    y: (currentPos.y - lastMousePos.current.y) / deltaTime,
                };
            }

            lastUpdateTime.current = currentTime;
            lastMousePos.current = currentPos;
        };

        const updateTrail = (pos: Position) => {
            if (!showTrail) return;

            setTrail(function (prev) {
                var newTrail = [pos].concat(prev.slice(0, trailLength - 1));
                return newTrail;
            });
        };

        const findMagneticElement = (x: number, y: number) => {
            const elements = document.querySelectorAll(magneticElements);

            // Fix: Convert NodeListOf<Element> to an array for reliable iteration
            for (const element of Array.from(elements)) {
                const rect = element.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const distance = Math.sqrt(
                    Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
                );

                if (distance < magneticDistance) {
                    return { x: centerX, y: centerY, distance };
                }
            }
            return null;
        };

        const smoothMouseMove = (e: MouseEvent) => {
            let currentPos = { x: e.clientX, y: e.clientY };

            // Check for magnetic elements
            const magneticTarget = findMagneticElement(currentPos.x, currentPos.y);
            if (magneticTarget) {
                const strength = 1 - (magneticTarget.distance / magneticDistance);
                currentPos = {
                    x: currentPos.x + (magneticTarget.x - currentPos.x) * strength * 0.3,
                    y: currentPos.y + (magneticTarget.y - currentPos.y) * strength * 0.3,
                };
            }

            updateVelocity(currentPos);
            updateTrail(currentPos);

            const speed = Math.sqrt(
                Math.pow(velocity.current.x, 2) + Math.pow(velocity.current.y, 2),
            );

            cursorX.set(currentPos.x);
            cursorY.set(currentPos.y);

            onCursorMove?.(currentPos);

            if (speed > 0.1 && rotateOnMove) {
                const currentAngle =
                    Math.atan2(velocity.current.y, velocity.current.x) * (180 / Math.PI) +
                    90;

                let angleDiff = currentAngle - previousAngle.current;
                if (angleDiff > 180) angleDiff -= 360;
                if (angleDiff < -180) angleDiff += 360;
                accumulatedRotation.current += angleDiff;
                rotation.set(accumulatedRotation.current);
                previousAngle.current = currentAngle;

                scale.set(0.95);
                setIsMoving(true);

                const timeout = setTimeout(function () {
                    scale.set(1);
                    setIsMoving(false);
                }, 150);

                return function () {
                    return clearTimeout(timeout);
                };
            }
        };

        const handleMouseEnter = function () {
            setIsVisible(true);
            onCursorEnter?.();
        };

        const handleMouseLeave = function () {
            if (hideOnLeave) {
                setIsVisible(false);
            }
            onCursorLeave?.();
        };

        const handleMouseDown = function () {
            if (scaleOnClick) {
                setIsClicking(true);
                scale.set(0.8);
            }
        };

        const handleMouseUp = function () {
            if (scaleOnClick) {
                setIsClicking(false);
                scale.set(1);
            }
        };

        // Mobile touch support
        const handleTouchStart = function (e: TouchEvent) {
            if (e.touches.length > 0) {
                const touch = e.touches[0];
                cursorX.set(touch.clientX);
                cursorY.set(touch.clientY);
                setIsVisible(true);
                if (scaleOnClick) {
                    setIsClicking(true);
                    scale.set(0.8);
                }
            }
        };

        const handleTouchMove = function (e: TouchEvent) {
            if (e.touches.length > 0) {
                const touch = e.touches[0];
                const currentPos = { x: touch.clientX, y: touch.clientY };

                updateVelocity(currentPos);
                cursorX.set(currentPos.x);
                cursorY.set(currentPos.y);

                const speed = Math.sqrt(
                    Math.pow(velocity.current.x, 2) + Math.pow(velocity.current.y, 2),
                );

                if (speed > 0.1 && rotateOnMove) {
                    const currentAngle =
                        Math.atan2(velocity.current.y, velocity.current.x) * (180 / Math.PI) +
                        90;

                    let angleDiff = currentAngle - previousAngle.current;
                    if (angleDiff > 180) angleDiff -= 360;
                    if (angleDiff < -180) angleDiff += 360;
                    accumulatedRotation.current += angleDiff;
                    rotation.set(accumulatedRotation.current);
                    previousAngle.current = currentAngle;
                }
            }
        };

        const handleTouchEnd = function () {
            if (scaleOnClick) {
                setIsClicking(false);
                scale.set(1);
            }
        };

        let rafId: number;
        const throttledMouseMove = function (e: MouseEvent) {
            if (rafId) return;

            rafId = requestAnimationFrame(function () {
                smoothMouseMove(e);
                rafId = 0;
            });
        };

        // Check if device supports touch
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

        if (!isTouchDevice) {
            document.body.style.cursor = "none";
        }

        window.addEventListener("mousemove", throttledMouseMove);
        document.addEventListener("mouseenter", handleMouseEnter);
        document.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mousedown", handleMouseDown);
        document.addEventListener("mouseup", handleMouseUp);

        // Add touch event listeners for mobile
        document.addEventListener("touchstart", handleTouchStart, { passive: true });
        document.addEventListener("touchmove", handleTouchMove, { passive: true });
        document.addEventListener("touchend", handleTouchEnd);

        return function () {
            window.removeEventListener("mousemove", throttledMouseMove);
            document.removeEventListener("mouseenter", handleMouseEnter);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mousedown", handleMouseDown);
            document.removeEventListener("mouseup", handleMouseUp);
            document.removeEventListener("touchstart", handleTouchStart);
            document.removeEventListener("touchmove", handleTouchMove);
            document.removeEventListener("touchend", handleTouchEnd);
            document.body.style.cursor = "auto";
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, [
        cursorX,
        cursorY,
        rotation,
        scale,
        disabled,
        showTrail,
        trailLength,
        rotateOnMove,
        scaleOnClick,
        hideOnLeave,
        magneticDistance,
        magneticElements,
        onCursorMove,
        onCursorEnter,
        onCursorLeave
    ]);

    if (disabled || !isVisible) return null;

    return (
        <>
            {/* Trail Effect */}
            {showTrail && trail.map(function (pos, index) {
                return (
                    <motion.div
                        key={index}
                        style={{
                            position: "fixed",
                            left: pos.x,
                            top: pos.y,
                            translateX: "-50%",
                            translateY: "-50%",
                            zIndex: 99 - index,
                            pointerEvents: "none",
                            opacity: (trailLength - index) / trailLength * 0.5,
                            scale: (trailLength - index) / trailLength * 0.8,
                        }}
                        className="w-2 h-2 bg-current rounded-full"
                    />
                );
            })}

            {/* Main Cursor */}
            <motion.div
                style={{
                    position: "fixed",
                    left: cursorX,
                    top: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                    rotate: rotateOnMove ? rotation : 0,
                    scale: scale,
                    zIndex: 100,
                    pointerEvents: "none",
                    willChange: "transform",
                    filter: glowEffect ? "drop-shadow(0 0 10px " + color + "40)" : "none", // String concatenation
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                }}
                className={cn("select-none", className)}
            >
                {cursorElement}
            </motion.div>
        </>
    );
}

export default SmoothCursor;
