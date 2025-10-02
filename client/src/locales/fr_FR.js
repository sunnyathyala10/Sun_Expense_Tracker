const fr_FR = () => {
  return {
    translation: {
      fields: {
        AppHeader: "Suivi des dépenses",
        AddIncome: "Ajouter un revenu",
        AddExpense: "Ajouter une dépense",
        EditIncome: "Modifier le revenu",
        EditExpense: "Modifier la dépense",
        IncomeType: "Type de revenu",
        ExpenseType: "Type de dépense",
        Amount: "Montant",
        ViewDetailedData: "Afficher les données détaillées",
        HideDetailedData: "Masquer les données détaillées",
        From: "Depuis",
        To: "Pour",
        Action: "Action",
        SelectLanguage: "Choisir la langue",
      },
      errorMessages: {
        enterAmountNumber:
          "Veuillez entrer un nombre dans le champ du montant.",
        editNotAllowed:
          "La modification de ce niveau n'est pas autorisée car cela invalide les données. Veuillez modifier les catégories individuelles respectives.",
        deleteNotAllowed:
          "La suppression de ce niveau n'est pas autorisée car cela invalide les données. Veuillez supprimer les catégories individuelles respectives.",
        frequentRequests: "Demandes fréquentes détectées.",
      },
      messages: {
        viewPage: "Afficher la page dans",
        expenseAdded: "Dépenses mises à jour !",
        incomeAdded: "Revenu mis à jour !",
        entryDeleted: "Entrée supprimée !",
      },
    },
  };
};

export default fr_FR;
