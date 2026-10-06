"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Clock,
  BookOpen,
  Award,
  CalendarDays,
  Users,
  PlayCircle,
  CheckCircle2,
} from "lucide-react";
import { PageHeader, Panel } from "@/components/layout/PageHeader";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CoopButton } from "@/components/cooperatives/CoopButton";
import { ProgressBar } from "@/components/cooperatives/ProgressBar";
import { Modal } from "@/components/ui/modal";
import { toast } from "@/components/ui/toast";
import { StaggerContainer, StaggerItem } from "@/components/animations";
import { Counter } from "@/components/animations/Counter";
import { courses } from "@/lib/data/learning";
import { useCoopStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import type { Course } from "@/lib/types";

const categories = [
  "All",
  "Agronomy",
  "Cooperative Management",
  "Finance",
  "Market Access",
  "Post-Harvest",
];

export default function LearningPage() {
  const [category, setCategory] = useState("All");
  const [certsOpen, setCertsOpen] = useState(false);
  const [lessonCourse, setLessonCourse] = useState<Course | null>(null);

  const enrolledCourseIds = useCoopStore((s) => s.enrolledCourseIds);
  const courseProgress = useCoopStore((s) => s.courseProgress);

  const progressOf = (c: Course) => courseProgress[c.id] ?? c.progress;

  const enrolled = courses.filter((c) => enrolledCourseIds.includes(c.id));
  const inProgress = enrolled.filter((c) => progressOf(c) > 0 && progressOf(c) < 100);
  const completed = enrolled.filter((c) => progressOf(c) === 100);
  const avgProgress = Math.round(
    enrolled.reduce((s, c) => s + progressOf(c), 0) / Math.max(1, enrolled.length)
  );

  const filtered = useMemo(
    () => (category === "All" ? courses : courses.filter((c) => c.category === category)),
    [category]
  );

  const workshops = courses.filter((c) => c.format === "Workshop");
  const events = courses.filter((c) => c.format === "Event");

  return (
    <>
      <PageHeader
        eyebrow="Learning centre"
        title="Grow your skills, grow your community"
        description="Courses, workshops and field days on agronomy, governance, finance and market access — many taught by fellow cooperative members."
        actions={
          <CoopButton variant="cta" icon={GraduationCap} onClick={() => setCertsOpen(true)}>
            Explore certificates
          </CoopButton>
        }
      />

      {/* Progress overview */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Panel className="lg:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-lg font-semibold text-coop-earth">
              Your learning progress
            </h2>
            <span className="rounded-full bg-coop-blue/10 px-3 py-1 text-xs font-bold text-coop-blue">
              {enrolled.length} enrolled
            </span>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-4 text-center">
            <div className="rounded-xl bg-coop-sand p-4">
              <p className="font-display text-2xl font-semibold text-coop-earth">
                <Counter value={avgProgress} suffix="%" />
              </p>
              <p className="text-[11px] uppercase tracking-wide text-sand-500">Avg progress</p>
            </div>
            <div className="rounded-xl bg-coop-sand p-4">
              <p className="font-display text-2xl font-semibold text-coop-earth">
                <Counter value={completed.length} />
              </p>
              <p className="text-[11px] uppercase tracking-wide text-sand-500">Completed</p>
            </div>
            <div className="rounded-xl bg-coop-sand p-4">
              <p className="font-display text-2xl font-semibold text-coop-earth">
                <Counter value={completed.length} />
              </p>
              <p className="text-[11px] uppercase tracking-wide text-sand-500">Certificates</p>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            {inProgress.map((c) => (
              <div key={c.id} className="flex items-center gap-4">
                <img src={c.image} alt="" className="h-12 w-12 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <ProgressBar
                    value={progressOf(c)}
                    tone="blue"
                    label={c.title}
                    detail={`${c.lessons} lessons · ${c.duration} · ${c.instructor}`}
                  />
                </div>
                <CoopButton
                  size="sm"
                  variant="outline"
                  icon={PlayCircle}
                  onClick={() => setLessonCourse(c)}
                >
                  Resume
                </CoopButton>
              </div>
            ))}
            {inProgress.length === 0 && (
              <p className="rounded-xl border border-dashed border-coop-sand-dark p-6 text-center text-sm text-sand-500">
                You have completed everything you are enrolled in — pick something new below.
              </p>
            )}
          </div>
        </Panel>

        <Panel title="Certificates">
          <ul className="space-y-3">
            {completed.map((c) => (
              <li key={c.id} className="flex items-center gap-3 rounded-xl bg-coop-gold-light/60 p-3.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-coop-gold text-white">
                  <Award className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-coop-earth">{c.title}</p>
                  <p className="text-xs text-sand-500">Issued by {c.instructor}</p>
                </div>
                <CheckCircle2 className="ml-auto h-4 w-4 shrink-0 text-coop-green" />
              </li>
            ))}
            <li className="flex items-center gap-3 rounded-xl border border-dashed border-coop-sand-dark p-3.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-coop-sand text-sand-400">
                <Award className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-bold text-sand-500">Cooperative Governance 2026</p>
                <p className="text-xs text-sand-400">2 courses to go</p>
              </div>
            </li>
          </ul>
        </Panel>
      </div>

      {/* Category filter */}
      <div className="mt-6 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-xs font-bold transition-all",
              category === cat
                ? "border-coop-blue bg-coop-blue text-white shadow-coop-blue"
                : "border-coop-sand-dark bg-white text-sand-600 hover:border-coop-blue/40"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <Tabs defaultValue="courses" className="mt-6">
        <TabsList>
          <TabsTrigger value="courses">Courses ({filtered.filter((c) => c.format === "Course").length})</TabsTrigger>
          <TabsTrigger value="workshops">Workshops ({workshops.length})</TabsTrigger>
          <TabsTrigger value="events">Events ({events.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="courses">
          <CourseGrid items={filtered.filter((c) => c.format === "Course")} onOpen={setLessonCourse} />
        </TabsContent>
        <TabsContent value="workshops">
          <CourseGrid items={workshops} onOpen={setLessonCourse} />
        </TabsContent>
        <TabsContent value="events">
          <CourseGrid items={events} onOpen={setLessonCourse} />
        </TabsContent>
      </Tabs>

      <Modal
        open={certsOpen}
        onClose={() => setCertsOpen(false)}
        title="Your certificates"
        description="Issued automatically when you complete a course."
      >
        <ul className="space-y-3">
          {completed.map((c) => (
            <li
              key={c.id}
              className="flex items-center gap-3 rounded-xl border border-coop-gold/30 bg-coop-gold-light/60 p-4"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-coop-gold text-white">
                <Award className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-coop-earth">{c.title}</p>
                <p className="text-xs text-sand-500">Issued by {c.instructor}</p>
              </div>
              <CoopButton
                size="sm"
                variant="outline"
                onClick={() =>
                  toast.success("Certificate downloaded", `“${c.title}” is saved to your device.`)
                }
              >
                Download
              </CoopButton>
            </li>
          ))}
          <li className="flex items-center gap-3 rounded-xl border border-dashed border-coop-sand-dark p-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-coop-sand text-sand-400">
              <Award className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-bold text-sand-500">Cooperative Governance 2026</p>
              <p className="text-xs text-sand-400">
                {Math.max(0, 2 - completed.length)} courses to go
              </p>
            </div>
          </li>
          {completed.length === 0 && (
            <li className="rounded-xl bg-coop-sand p-4 text-center text-sm text-sand-500">
              Finish a course and your certificate appears here.
            </li>
          )}
        </ul>
      </Modal>

      <Modal
        open={!!lessonCourse}
        onClose={() => setLessonCourse(null)}
        title={lessonCourse?.title ?? ""}
        description={lessonCourse ? `${lessonCourse.instructor} · ${lessonCourse.lessons} lessons` : undefined}
      >
        {lessonCourse && <LessonPlayer course={lessonCourse} onClose={() => setLessonCourse(null)} />}
      </Modal>
    </>
  );
}

function LessonPlayer({ course, onClose }: { course: Course; onClose: () => void }) {
  const courseProgress = useCoopStore((s) => s.courseProgress);
  const setCourseProgress = useCoopStore((s) => s.setCourseProgress);

  const progress = courseProgress[course.id] ?? course.progress;
  const step = Math.max(5, Math.round(100 / course.lessons));
  const currentLesson = Math.min(
    course.lessons,
    Math.max(1, Math.ceil((progress / 100) * course.lessons))
  );
  const finished = progress >= 100;

  const completeLesson = () => {
    const next = Math.min(100, progress + step);
    setCourseProgress(course.id, next);
    if (next >= 100) {
      toast.success("Course completed", `Your certificate for “${course.title}” is ready.`);
    } else {
      const left = Math.max(0, course.lessons - Math.ceil((next / 100) * course.lessons));
      toast.success("Lesson completed", `${next}% complete — ${left} lesson${left === 1 ? "" : "s"} to go.`);
    }
  };

  return (
    <div className="space-y-5">
      <div className="relative h-40 overflow-hidden rounded-xl">
        <img src={course.image} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-coop-earth/85 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4 text-white">
          <p className="text-xs font-bold uppercase tracking-wider text-coop-gold">
            {course.category} · {course.level}
          </p>
          <p className="font-display text-lg font-semibold">{course.title}</p>
        </div>
      </div>

      <ProgressBar value={progress} tone="blue" label="Course progress" detail={`${progress}% complete`} />

      <div className="rounded-xl bg-coop-sand/70 p-4 text-sm text-sand-600">
        {finished ? (
          <p>
            You have finished all {course.lessons} lessons. Download your certificate or review the
            material whenever you like.
          </p>
        ) : (
          <p>
            You are on <strong className="text-coop-earth">lesson {currentLesson} of {course.lessons}</strong>{" "}
            — {course.duration} of material in total.
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <CoopButton type="button" variant="ghost" onClick={onClose}>
          Close
        </CoopButton>
        {finished ? (
          <CoopButton
            type="button"
            variant="cta"
            icon={Award}
            onClick={() =>
              toast.success("Certificate downloaded", `“${course.title}” is saved to your device.`)
            }
          >
            Download certificate
          </CoopButton>
        ) : (
          <CoopButton type="button" variant="primary" icon={CheckCircle2} onClick={completeLesson}>
            Mark lesson {currentLesson} complete
          </CoopButton>
        )}
      </div>
    </div>
  );
}

function CourseGrid({ items, onOpen }: { items: typeof courses; onOpen: (c: Course) => void }) {
  const enrolledCourseIds = useCoopStore((s) => s.enrolledCourseIds);
  const courseProgress = useCoopStore((s) => s.courseProgress);
  const enrollCourse = useCoopStore((s) => s.enrollCourse);

  const progressOf = (c: Course) => courseProgress[c.id] ?? c.progress;

  const handleAction = (c: Course, enrolled: boolean) => {
    if (!enrolled) {
      enrollCourse(c.id);
      toast.success("Enrolled", `“${c.title}” was added to your learning plan.`);
    }
    onOpen(c);
  };

  return (
    <StaggerContainer className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3" staggerDelay={0.08}>
      {items.map((c) => {
        const enrolled = enrolledCourseIds.includes(c.id);
        const progress = progressOf(c);
        return (
          <StaggerItem key={c.id}>
            <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-coop-sand-dark/70 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
              <div className="relative h-36 overflow-hidden">
                <img
                  src={c.image}
                  alt={c.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-coop-earth/70 to-transparent" />
                <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-coop-blue">
                  {c.category}
                </span>
                {c.format !== "Course" && (
                  <span className="absolute right-3 top-3 rounded-full bg-coop-coral px-2.5 py-1 text-[11px] font-bold text-white">
                    {c.format}
                  </span>
                )}
                <div className="absolute bottom-3 left-3 flex items-center gap-3 text-[11px] font-semibold text-white">
                  <span className="inline-flex items-center gap-1">
                    <BookOpen className="h-3 w-3" /> {c.lessons} lessons
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {c.duration}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Users className="h-3 w-3" /> {c.learners.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-coop-sand px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-sand-600">
                    {c.level}
                  </span>
                  {c.date && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-coop-gold">
                      <CalendarDays className="h-3 w-3" />
                      {new Date(c.date).toLocaleDateString("en-NG", { day: "numeric", month: "short" })}
                    </span>
                  )}
                </div>

                <h3 className="mt-2 font-display text-base font-semibold leading-snug text-coop-earth">
                  {c.title}
                </h3>
                <p className="mt-1 text-xs text-sand-500">{c.instructor}</p>

                {enrolled && progress > 0 && (
                  <ProgressBar className="mt-3" value={progress} tone="blue" label="" detail="" />
                )}
                {enrolled && progress === 100 && (
                  <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-coop-green">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Completed · certificate issued
                  </p>
                )}

                <div className="mt-auto pt-4">
                  <CoopButton
                    size="sm"
                    variant={enrolled ? "primary" : "cta"}
                    className="w-full"
                    icon={enrolled ? PlayCircle : GraduationCap}
                    onClick={() => handleAction(c, enrolled)}
                  >
                    {enrolled
                      ? progress === 100
                        ? "Review course"
                        : "Continue"
                      : c.format === "Course"
                        ? "Enrol now"
                        : "Reserve a seat"}
                  </CoopButton>
                </div>
              </div>
            </article>
          </StaggerItem>
        );
      })}
    </StaggerContainer>
  );
}
