"use client";

import { css } from "@flows/styled-system/css";
import { useWaitlistForm } from "hooks/use-waitlist-form";
import { type FC } from "react";
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

export const WaitlistForm: FC = () => {
  const { setThankYouOpen, email, handleSubmit, loading, setEmail, thankYouOpen, loadRecaptcha } =
    useWaitlistForm();

  return (
    <>
      <form
        className={`${css({
          display: "flex",
          gap: "space8",
          alignItems: "center",
          flexDirection: "column",
          sm: {
            flexDirection: "row",
          },
        })} waitlist-form`}
        onSubmit={handleSubmit}
      >
        <Input
          onChange={(e) => setEmail(e.currentTarget.value)}
          onFocus={loadRecaptcha}
          placeholder="Enter your email"
          required
          size="large"
          type="email"
          value={email}
        />
        <Button loading={loading} size="large" type="submit">
          Join waitlist
        </Button>
      </form>
      <Dialog onOpenChange={setThankYouOpen} open={thankYouOpen}>
        <DialogTitle>Thank you!</DialogTitle>
        <DialogContent>
          <Text>
            Thank you for joining the waitlist. We will keep you in the loop when Flows are ready.
          </Text>
        </DialogContent>

        <DialogActions>
          <DialogClose asChild>
            <Button shadow="none" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogActions>
      </Dialog>
    </>
  );
};
