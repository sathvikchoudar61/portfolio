import { useEffect, useRef, useState } from "react";

const skills = [
    { name: "React", level: 3 }, { name: "Next.js", level: 3 }, { name: "Node.js", level: 3 },
    { name: "TypeScript", level: 2 }, { name: "Tailwind", level: 2 }, { name: "Framer", level: 2 },
    { name: "Git", level: 1 }, { name: "AWS", level: 2 }, { name: "Docker", level: 2 },
    { name: "PostgreSQL", level: 3 }, { name: "MongoDB", level: 2 }, { name: "Python", level: 2 },
    { name: "Java", level: 2 }, { name: "Figma", level: 1 }, { name: "Redux", level: 2 },
    { name: "GraphQL", level: 2 }, { name: "Linux", level: 2 }, { name: "Three.js", level: 2 }
];

export default function GravitySkills({ gravityStrength = 0.4 }) {
    const containerRef = useRef(null);
    const requestRef = useRef();
    const isDragging = useRef(-1);
    const previousDrag = useRef({ x: 0, y: 0 });

    useEffect(() => {
        if (!containerRef.current) return;

        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;

        // Initialize entities
        const ents = skills.map((skill, i) => ({
            id: i,
            x: Math.random() * (width - 100) + 50,
            y: -Math.random() * 500 - 50,
            vx: (Math.random() - 0.5) * 2,
            vy: 0,
            radius: 30 + skill.name.length * 2.5,
            text: skill.name
        }));

        containerRef.current.physicsEntities = ents;

        const physicsLoop = () => {
            const friction = 0.99; // Air resistance
            const gravity = 0.4;
            const bounce = 0.7;
            const entities = containerRef.current.physicsEntities;

            if (!entities) return;

            // Physics Update
            entities.forEach((entity, i) => {
                if (isDragging.current === i) {
                    // Update velocity for throw effect when released
                    entity.vx = entity.x - previousDrag.current.x;
                    entity.vy = entity.y - previousDrag.current.y;
                    previousDrag.current = { x: entity.x, y: entity.y };
                    return;
                }

                // Gravity & Friction
                entity.vy += gravity;
                entity.vx *= friction;
                entity.vy *= friction;

                // Move
                entity.x += entity.vx;
                entity.y += entity.vy;

                // Floor
                if (entity.y + entity.radius > height) {
                    entity.y = height - entity.radius;
                    entity.vy *= -bounce;
                }
                // Ceiling
                if (entity.y - entity.radius < 0) {
                    entity.y = entity.radius;
                    entity.vy *= -bounce;
                }
                // Walls
                if (entity.x + entity.radius > width) {
                    entity.x = width - entity.radius;
                    entity.vx *= -bounce;
                }
                if (entity.x - entity.radius < 0) {
                    entity.x = entity.radius;
                    entity.vx *= -bounce;
                }

                // Collisions
                for (let j = i + 1; j < entities.length; j++) {
                    const other = entities[j];
                    const dx = other.x - entity.x;
                    const dy = other.y - entity.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const minDist = entity.radius + other.radius;

                    if (distance < minDist) {
                        const angle = Math.atan2(dy, dx);
                        const targetX = entity.x + Math.cos(angle) * minDist;
                        const targetY = entity.y + Math.sin(angle) * minDist;

                        const ax = (targetX - other.x) * 0.05;
                        const ay = (targetY - other.y) * 0.05;

                        entity.vx -= ax;
                        entity.vy -= ay;
                        other.vx += ax;
                        other.vy += ay;
                    }
                }
            });

            // DOM Update
            entities.forEach(entity => {
                const el = document.getElementById(`skill-${entity.id}`);
                if (el) {
                    el.style.transform = `translate(${entity.x - entity.radius}px, ${entity.y - entity.radius}px)`;
                }
            });

            requestRef.current = requestAnimationFrame(physicsLoop);
        };

        requestRef.current = requestAnimationFrame(physicsLoop);
        return () => cancelAnimationFrame(requestRef.current);
    }, []);

    const handlePointerDown = (e, i) => {
        e.stopPropagation(); // Prevent triggering container shockwave
        isDragging.current = i;
        const rect = containerRef.current.getBoundingClientRect();
        previousDrag.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    };

    const handlePointerUp = () => {
        isDragging.current = -1;
    };

    const handlePointerMove = (e) => {
        if (isDragging.current !== -1 && containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            // Update entity position directly
            const entity = containerRef.current.physicsEntities[isDragging.current];
            if (entity) {
                entity.x = e.clientX - rect.left;
                entity.y = e.clientY - rect.top;
                // Add some velocity to previousDrag for "throw" calculation
                entity.vx = (entity.x - previousDrag.current.x) * 0.5;
                entity.vy = (entity.y - previousDrag.current.y) * 0.5;
                previousDrag.current = { x: entity.x, y: entity.y };
            }
        }
    };

    // SHOCKWAVE EFFECT
    const handleContainerClick = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        containerRef.current.physicsEntities.forEach(entity => {
            const dx = entity.x - clickX;
            const dy = entity.y - clickY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Apply blast force inversely proportional to distance
            const force = 8000 / (distance + 50); // Increased power significantly
            const angle = Math.atan2(dy, dx);

            entity.vx += Math.cos(angle) * force;
            entity.vy += Math.sin(angle) * force;
        });
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full h-[600px] bg-zinc-50/50 dark:bg-black/20 rounded-3xl overflow-hidden border border-zinc-200 dark:border-white/5 backdrop-blur-sm shadow-inner cursor-crosshair touch-none group"
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onClick={handleContainerClick}
        >
            <div className="absolute top-4 left-6 pointer-events-none text-muted-foreground text-sm uppercase tracking-wider font-semibold z-0 opacity-50 group-hover:opacity-100 transition-opacity">
                Physics Playground • Click to Blast • Drag to Throw
            </div>

            {skills.map((skill, i) => {
                const radius = 30 + skill.name.length * 2.5;
                return (
                    <div
                        key={i}
                        id={`skill-${i}`}
                        onPointerDown={(e) => handlePointerDown(e, i)}
                        className="absolute flex items-center justify-center rounded-full shadow-lg border-2 border-transparent bg-white dark:bg-zinc-800 text-zinc-800 dark:text-gray-100 font-bold whitespace-nowrap select-none hover:scale-110 hover:border-indigo-500 hover:shadow-indigo-500/50 hover:z-50 transition-all duration-75 cursor-grab active:cursor-grabbing will-change-transform active:scale-95"
                        style={{
                            width: radius * 2,
                            height: radius * 2,
                            left: 0,
                            top: 0,
                            // Start off-screen
                            transform: `translate(${Math.random() * 500}px, -200px)`
                        }}
                    >
                        {skill.name}
                    </div>
                );
            })}
        </div>
    );
}
