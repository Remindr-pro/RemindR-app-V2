"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Input from "@/app/components/atoms/Input";
import Button from "@/app/components/atoms/Button";
import { useAuth } from "@/lib/auth-provider";
import { AuthService } from "@/lib/auth-service";

export default function ParametresPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isVerifyingCurrentPassword, setIsVerifyingCurrentPassword] =
    useState(false);
  const [isCurrentPasswordVerified, setIsCurrentPasswordVerified] =
    useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    return (
      isCurrentPasswordVerified &&
      newPassword.length >= 8 &&
      confirmNewPassword.length >= 8 &&
      newPassword === confirmNewPassword &&
      !isSubmitting
    );
  }, [
    confirmNewPassword,
    isCurrentPasswordVerified,
    isSubmitting,
    newPassword,
  ]);

  const handleCurrentPasswordChange = (value: string) => {
    setCurrentPassword(value);
    setIsCurrentPasswordVerified(false);
    setPasswordError(null);
    setPasswordSuccess(null);
  };

  const handleVerifyCurrentPassword = async () => {
    if (!currentPassword) {
      setPasswordError("Renseignez d'abord votre ancien mot de passe.");
      return;
    }

    try {
      setIsVerifyingCurrentPassword(true);
      setPasswordError(null);
      setPasswordSuccess(null);
      await AuthService.verifyPassword(currentPassword);
      setIsCurrentPasswordVerified(true);
      setPasswordSuccess("Ancien mot de passe vérifié.");
    } catch (error) {
      setIsCurrentPasswordVerified(false);
      setPasswordError(
        error instanceof Error
          ? error.message
          : "Ancien mot de passe invalide.",
      );
    } finally {
      setIsVerifyingCurrentPassword(false);
    }
  };

  const handleChangePassword = async () => {
    if (!isCurrentPasswordVerified) {
      setPasswordError(
        "Veuillez vérifier votre ancien mot de passe avant de continuer.",
      );
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError(
        "Le nouveau mot de passe doit contenir au moins 8 caractères.",
      );
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setPasswordError(
        "La confirmation du nouveau mot de passe ne correspond pas.",
      );
      return;
    }

    try {
      setIsSubmitting(true);
      setPasswordError(null);
      setPasswordSuccess(null);

      await AuthService.changePassword(currentPassword, newPassword);

      setPasswordSuccess("Votre mot de passe a bien été modifié.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setIsCurrentPasswordVerified(false);
    } catch (error) {
      setPasswordError(
        error instanceof Error
          ? error.message
          : "Impossible de modifier votre mot de passe.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setIsDeletingAccount(true);
      setDeleteError(null);

      await AuthService.deleteMyAccount();
      await logout();

      router.push("/connexion");
    } catch (error) {
      setDeleteError(
        error instanceof Error
          ? error.message
          : "Impossible de supprimer votre compte.",
      );
    } finally {
      setIsDeletingAccount(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="w-full mx-auto pt-8">
      <div className="p-8 bg-light rounded-2xl">
        <h1 className="text-4xl font-bold text-dark mb-6 font-inclusive">
          Paramètres
        </h1>

        <p className="text-base text-dark font-inclusive mb-8 leading-relaxed">
          <span className="font-bold text-xl">
            Gérez vos paramètres de connexion.
          </span>
          <br />
          Ici, vous pouvez modifier vos paramètres de connexion et supprimer
          votre compte.
        </p>

        <div className="flex flex-col gap-8">
          {/* Section Identifiants */}
          <div className="flex flex-col gap-6 max-w-3xl">
            <div className="flex items-center gap-3">
              <Image
                src="/images/icons/identification.png"
                alt="Identifiants"
                width={35}
                height={35}
                className="w-9 h-9"
              />
              <h2 className="text-lg font-bold text-dark font-inclusive">
                Identifiants
              </h2>
            </div>

            <div className="flex flex-col gap-6 pl-9">
              <Input
                type="email"
                label="Adresse e-mail"
                defaultValue={user?.email}
                disabled
              />

              <div className="flex flex-col gap-3">
                <Input
                  type="password"
                  label="Ancien mot de passe"
                  showPasswordToggle
                  value={currentPassword}
                  onChange={(e) => handleCurrentPasswordChange(e.target.value)}
                />
                <div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleVerifyCurrentPassword}
                    disabled={!currentPassword || isVerifyingCurrentPassword}
                  >
                    {isVerifyingCurrentPassword
                      ? "Vérification..."
                      : "Vérifier l'ancien mot de passe"}
                  </Button>
                </div>
              </div>

              <Input
                type="password"
                label="Nouveau mot de passe"
                showPasswordToggle
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={!isCurrentPasswordVerified}
              />

              <Input
                type="password"
                label="Confirmer le nouveau mot de passe"
                showPasswordToggle
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                disabled={!isCurrentPasswordVerified}
              />

              {passwordError && (
                <p className="text-sm font-inclusive text-red-1">
                  {passwordError}
                </p>
              )}
              {passwordSuccess && (
                <p className="text-sm font-inclusive text-greenMain">
                  {passwordSuccess}
                </p>
              )}

              <div>
                <Button
                  size="sm"
                  variant="green"
                  onClick={handleChangePassword}
                  disabled={!canSubmit}
                >
                  {isSubmitting ? "Modification..." : "Modifier"}
                </Button>
              </div>
            </div>
          </div>

          {/* Section Suppression du compte */}
          <div className="flex flex-col gap-6 max-w-3xl">
            <div className="flex items-center gap-3">
              <Image
                src="/images/icons/suppression.png"
                alt="Suppression du compte"
                width={35}
                height={35}
                className="w-9 h-9"
              />
              <h2 className="text-lg font-bold text-dark font-inclusive">
                Suppression du compte
              </h2>
            </div>

            <div className="flex flex-col pl-9">
              <p className="text-base text-dark font-inclusive leading-relaxed">
                Supprimez votre compte et toutes les données associées. Aucune
                récupération possible.
              </p>
              <button
                type="button"
                onClick={() => setShowDeleteModal(true)}
                className="text-left text-greenMain underline font-inclusive text-base hover:text-greenMain-2 transition-colors cursor-pointer"
              >
                Supprimer votre compte
              </button>
              {deleteError && (
                <p className="mt-2 text-sm font-inclusive text-red-1">
                  {deleteError}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-dark/50 backdrop-blur-sm">
          <div className="w-full max-w-md bg-light rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-semibold text-dark font-inclusive mb-3">
              Suppression du compte
            </h3>
            <p className="text-sm text-gray-4 font-inclusive mb-6">
              Etes-vous sur de vouloir supprimer votre compte ? Cette action est
              irreversible.
            </p>
            <div className="flex items-center justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeletingAccount}
              >
                Annuler
              </Button>
              <Button
                type="button"
                variant="green"
                onClick={handleDeleteAccount}
                disabled={isDeletingAccount}
              >
                {isDeletingAccount ? "Suppression..." : "Confirmer"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
