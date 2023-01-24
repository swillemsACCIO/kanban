import React from "react";

import ThemeProvider from "Kanban/providers/ThemeProvider";
import KanbanBoardContainer from "Kanban/containers/KanbanBoard";
import TranslationProvider from "./providers/TranslationProvider";

interface KanbanProps {}

const Kanban: React.FC<KanbanProps> = () => {
  return (
    <ThemeProvider>
      <TranslationProvider>
        <KanbanBoardContainer />
      </TranslationProvider>
    </ThemeProvider>
  );
};

export default Kanban;
