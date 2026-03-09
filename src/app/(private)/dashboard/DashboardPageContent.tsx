"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Badge from "@/app/components/atoms/Badge";
import BlogCarouselCard from "@/app/components/molecules/BlogCarouselCard";
import RecommendedRemindersCard from "@/app/components/molecules/RecommendedRemindersCard";
import CommunicationCard from "@/app/components/molecules/CommunicationCard";
import PromotionalCard from "@/app/components/molecules/PromotionalCard";
import DashboardSidebar from "@/app/components/molecules/DashboardSidebar";
import WelcomeProfileModal from "@/app/components/organisms/WelcomeProfileModal";
import type { ArticleCardProps } from "@/app/components/molecules/ArticleCard";
import { getDashboardFamilyMembers } from "@/app/actions/family";
import { getDashboardMemberData } from "@/app/actions/dashboard";
import { useAuth } from "@/lib/auth-provider";

type MemberColor = "green" | "purple" | "blue" | "pink" | "orange";
const MEMBER_COLORS: MemberColor[] = [
  "green",
  "purple",
  "blue",
  "pink",
  "orange",
];

interface FamilyMember {
  id: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  color: MemberColor;
}

interface NotificationItem {
  id: string;
  title?: string | null;
  message?: string | null;
  sentAt: string;
}

interface DashboardPageContentProps {
  memberId?: string;
}

export default function DashboardPageContent({
  memberId,
}: DashboardPageContentProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [messages, setMessages] = useState<
    {
      id: string;
      day: string;
      month: string;
      content: string;
      actionText?: string;
      actionUrl?: string;
    }[]
  >([]);
  const [reminders, setReminders] = useState<
    {
      id: string;
      title: string;
      person: string;
      date: string;
      source: string;
      color: "green" | "orange" | "purple" | "blue" | "pink";
      learnMoreUrl?: string;
    }[]
  >([]);

  const blogArticles: ArticleCardProps[] = [
    {
      image: "/images/articles/article-semaine-1.jpg",
      category: "Prévention",
      title: "Automne: 5 réflexes santé pour vous et vos proches",
      date: "20 octobre 2025",
      variant: "advice",
      position: "vertical",
      isForward: true,
    },
  ];

  const handleDismissMessage = (id: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  const handleAcceptReminder = (id: string) => {
    console.log("Rappel accepté:", id);
  };

  const handleRejectReminder = (id: string) => {
    console.log("Rappel refusé:", id);
  };

  const memberColorById = useMemo(() => {
    const map = new Map<string, MemberColor>();
    familyMembers.forEach((member, index) => {
      map.set(
        member.id,
        member.color || MEMBER_COLORS[index % MEMBER_COLORS.length],
      );
    });
    return map;
  }, [familyMembers]);

  const selectedMember = useMemo(
    () =>
      familyMembers.find((member) => member.id === selectedMemberId) || null,
    [familyMembers, selectedMemberId],
  );
  const isOwnDashboard = !!user?.id && selectedMemberId === user.id;

  useEffect(() => {
    const fetchFamilyAndSelectMember = async () => {
      if (!user?.id) return;

      try {
        const activeMembers = await getDashboardFamilyMembers();
        setFamilyMembers(activeMembers);

        if (!memberId || memberId === user.id) {
          setSelectedMemberId(user.id);
          if (memberId === user.id) router.replace("/dashboard");
          return;
        }

        const isValidMember = activeMembers.some(
          (member) => member.id === memberId,
        );
        if (!isValidMember) {
          setSelectedMemberId(user.id);
          router.replace("/dashboard");
          return;
        }

        setSelectedMemberId(memberId);
      } catch {
        const fallbackMembers: FamilyMember[] = [
          {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            isActive: true,
            color: MEMBER_COLORS[0],
          },
        ];
        setFamilyMembers(fallbackMembers);
        setSelectedMemberId(user.id);
        if (memberId && memberId !== user.id) {
          router.replace("/dashboard");
        }
      }
    };

    fetchFamilyAndSelectMember();
  }, [memberId, router, user?.firstName, user?.id, user?.lastName]);

  useEffect(() => {
    const fetchMemberData = async () => {
      if (!selectedMemberId) return;

      const today = new Date();
      const start = new Date(today.getFullYear(), today.getMonth(), 1);
      const end = new Date(today.getFullYear(), today.getMonth() + 2, 0);

      try {
        const payload = await getDashboardMemberData(
          selectedMemberId,
          start.toISOString(),
          end.toISOString(),
        );

        const nextReminders = (payload.reminders || [])
          .filter((item) => item.user?.id === selectedMemberId)
          .slice(0, 5)
          .map((item) => {
            const reminderMember = familyMembers.find(
              (member) => member.id === item.user.id,
            );
            const color = memberColorById.get(item.user.id) || "purple";
            const referenceDate =
              item.startDate || item.createdAt || new Date().toISOString();

            return {
              id: item.id,
              title: item.title,
              person: reminderMember?.firstName || item.user.firstName,
              date: new Date(referenceDate).toLocaleDateString("fr-FR", {
                month: "short",
                year: "numeric",
              }),
              source: "RemindR",
              color,
              learnMoreUrl: "#",
            };
          });
        setReminders(nextReminders);

        const nextMessages = (payload.notifications || [])
          .slice(0, 5)
          .map((item: NotificationItem) => {
            const date = new Date(item.sentAt);
            return {
              id: item.id,
              day: String(date.getDate()),
              month: date
                .toLocaleString("fr-FR", { month: "short" })
                .replace(".", "")
                .toUpperCase(),
              content: item.message || item.title || "Notification",
              actionText: "Voir le détail",
              actionUrl: "#",
            };
          });
        setMessages(nextMessages);
      } catch {
        setReminders([]);
        setMessages([]);
      }
    };

    fetchMemberData();
  }, [familyMembers, memberColorById, selectedMemberId]);

  const handleSelectMember = (nextMemberId: string) => {
    if (nextMemberId === user?.id) {
      router.push("/dashboard");
      return;
    }
    router.push(`/dashboard/membres/${nextMemberId}`);
  };

  const userName = user?.firstName ?? "Camille";

  return (
    <div className="w-full mx-auto bg-gray-1 rounded-2xl">
      {isOwnDashboard && (
        <WelcomeProfileModal
          isOpen={showWelcomeModal && !user?.profileCompleted}
          onClose={() => setShowWelcomeModal(false)}
          userName={userName}
          onCompleteProfile={() => {
            setShowWelcomeModal(false);
            router.push("/dashboard/mon-compte");
          }}
          onIgnore={() => setShowWelcomeModal(false)}
        />
      )}

      <div className="flex flex-col gap-4">
        <div className="h-16 flex items-center justify-between border-b border-gray-2">
          <div className="px-6 xl:px-10 flex items-center justify-between gap-4 flex-1">
            <h2 className="text-xl font-semibold">
              {isOwnDashboard ? (
                <>
                  Bonjour, <span className="text-greenMain">{userName}</span>
                </>
              ) : (
                <>
                  {selectedMember?.firstName ? (
                    <>
                      Tableau de bord de{" "}
                      <span className="text-greenMain">
                        {selectedMember.firstName}
                      </span>
                    </>
                  ) : (
                    "Tableau de bord"
                  )}
                </>
              )}
            </h2>

            <div className="flex items-center gap-3 flex-wrap">
              {familyMembers.map((member) => {
                const isSelected = member.id === selectedMemberId;
                const color = memberColorById.get(member.id) || "purple";
                return (
                  <Badge
                    key={member.id}
                    text={member.firstName}
                    size="sm"
                    variant={isSelected ? "fill" : "outline"}
                    color={color}
                    onClick={() => handleSelectMember(member.id)}
                  />
                );
              })}
              <Badge
                text="Voir tout le monde"
                size="sm"
                color="green"
                url="/dashboard/membres"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="py-6 xl:py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 flex flex-col gap-6 min-w-0">
            <div className="flex flex-col md:flex-row gap-6">
              <div>
                <PromotionalCard
                  image="/images/illustrations/pub-mutuelle-2.png"
                  title="Envie d'une mutuelle plus humaine ?"
                />
              </div>

              <div className="w-full">
                <BlogCarouselCard articles={blogArticles} />
              </div>
            </div>

            <div>
              <RecommendedRemindersCard
                reminders={reminders}
                onAccept={handleAcceptReminder}
                onReject={handleRejectReminder}
              />
            </div>

            <div className="flex gap-6">
              <div className="w-full">
                <CommunicationCard
                  messages={messages.map((msg) => ({
                    ...msg,
                    onDismiss: handleDismissMessage,
                  }))}
                />
              </div>
            </div>
          </div>

          <div className="lg:w-70 xl:w-80 shrink-0">
            <DashboardSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
