"use client";

import { Modal } from "@/components/ui/modal";
import { Drawer } from "@/components/ui/drawer";
import { useExampleUIStore } from "../stores/example-ui.store";
import { ExampleForm } from "./example-form";
import { StatusBadge } from "@/components/shared/status-badge";
import { MoneyDisplay } from "@/components/shared/money-display";
import { DateDisplay } from "@/components/shared/date-display";

export function ExampleDialog() {
  const {
    isCreateModalOpen,
    closeCreateModal,
    isDetailsDrawerOpen,
    closeDetailsDrawer,
    selectedItem,
  } = useExampleUIStore();

  return (
    <>
      {/* Create Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
        title="Create New Item"
        size="lg"
      >
        <ExampleForm onSuccess={closeCreateModal} onCancel={closeCreateModal} />
      </Modal>

      {/* Details Drawer */}
      <Drawer
        isOpen={isDetailsDrawerOpen}
        onClose={closeDetailsDrawer}
        title={
          <div>
            <span className="text-lg font-bold">Item Details</span>
            {selectedItem && (
              <span className="block text-xs text-default-400 font-normal">
                ID: {selectedItem.id}
              </span>
            )}
          </div>
        }
      >
        {selectedItem && (
          <div className="flex flex-col gap-5">
            <div>
              <label className="text-xs font-semibold text-default-400 uppercase tracking-wider">
                Name
              </label>
              <p className="text-base font-semibold text-foreground mt-0.5">{selectedItem.name}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-default-400 uppercase tracking-wider">
                  Category
                </label>
                <p className="text-sm font-medium text-foreground mt-0.5">
                  {selectedItem.category}
                </p>
              </div>
              <div>
                <label className="text-xs font-semibold text-default-400 uppercase tracking-wider">
                  Status
                </label>
                <div className="mt-0.5">
                  <StatusBadge status={selectedItem.status} />
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-default-400 uppercase tracking-wider">
                Amount
              </label>
              <p className="text-xl font-bold mt-0.5">
                <MoneyDisplay amount={selectedItem.amount} />
              </p>
            </div>

            {selectedItem.description && (
              <div>
                <label className="text-xs font-semibold text-default-400 uppercase tracking-wider">
                  Description
                </label>
                <p className="text-sm text-default-600 mt-0.5">{selectedItem.description}</p>
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-default-400 uppercase tracking-wider">
                Created At
              </label>
              <p className="mt-0.5">
                <DateDisplay date={selectedItem.createdAt} />
              </p>
            </div>
          </div>
        )}
      </Drawer>
    </>
  );
}
