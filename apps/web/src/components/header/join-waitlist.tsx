"use client";

import { css } from "@flows/styled-system/css";
import { useWaitlistForm } from "hooks";
import type { FC } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogClose,
  DialogContent,
  DialogTitle,
  Input,
  Text,
} from "ui";

export const JoinWaitlist: FC = () => {
  const { email, handleSubmit, loading, setEmail, setThankYouOpen, thankYouOpen, loadRecaptcha } =
    useWaitlistForm();

  return (
    <Dialog
      onOpenChange={(open) => open && setThankYouOpen(false)}
      trigger={<Button variant="black">Join waitlist</Button>}
    >
      <DialogTitle>Join our waitlist</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          {!thankYouOpen ? (
            <Input
              inputClassName={css({ mt: "space8" })}
              label={<Text variant="bodyM">Get notified when we launch Flows.</Text>}
              onChange={(e) => setEmail(e.currentTarget.value)}
              onFocus={loadRecaptcha}
              placeholder="Enter your email"
              required
              size="medium"
              type="email"
              value={email}
            />
          ) : (
            <Text>
              Thank you for joining the waitlist. We will keep you in the loop when Flows are ready.
            </Text>
          )}
        </DialogContent>
        <DialogActions>
          <DialogClose asChild>
            <Button shadow="none" variant="secondary">
              Close
            </Button>
          </DialogClose>
          {!thankYouOpen && (
            <Button loading={loading} type="submit">
              Join
            </Button>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
};
