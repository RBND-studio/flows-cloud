import { init } from "@flows/js/core";
import type { FC } from "react";
import { useEffect } from "react";

export const DemoFlows: FC = () => {
  useEffect(() => {
    void init({
      flows: [
        {
          id: "tooltip",
          rootElement: ".tooltip-root",
          frequency: "every-time",
          steps: [
            {
              title: "Tooltip step",
              body: "This is a content of a tooltip. You can use it to describe something.",
              targetElement: ".tooltip-target",
              placement: "right",
              // overlay: true,
            },
          ],
        },
        {
          id: "modal",
          rootElement: ".modal-root",
          frequency: "every-time",
          steps: [
            {
              title: "Modal",
              body: "This is a content of a modal. <br/> You can put more information here compared to a tooltip.",
            },
          ],
        },
        {
          id: "banner",
          rootElement: ".banner-root",
          frequency: "every-time",
          steps: [
            {
              type: "banner",
              title: "Banner",
              body: "This is a content of a banner. <br/> You can show announcements to users without interrupting their workflow.",
            },
          ],
        },
        {
          id: "wait",
          rootElement: ".wait-root",
          frequency: "every-time",
          steps: [
            {
              title: "Tooltip before wait",
              body: "This tooltip is just a step before the wait. Click the button to continue.",
              targetElement: ".wait-tooltip-target",
              placement: "right",
            },
            {
              wait: [
                {
                  clickElement: ".flow-3",
                },
              ],
            },
            {
              title: "You waited!",
              body: "The flow continued after you clicked the button. This is the last step.",
            },
          ],
        },
        {
          id: "fork",
          rootElement: ".fork-root",
          frequency: "every-time",
          steps: [
            {
              title: "Modal before fork",
              body: "This modal is just a step before the fork step. Click the button to continue.",
            },
            {
              wait: [
                {
                  clickElement: ".branch-a",
                  targetBranch: 0,
                },
                {
                  clickElement: ".branch-b",
                  targetBranch: 1,
                },
              ],
            },
            [
              [
                {
                  title: "Branch A",
                  body: "This is the first branch",
                },
              ],
              [
                {
                  title: "Branch B",
                  body: "This is the second branch",
                },
              ],
            ],
            {
              title: "The end",
              body: "This step is shared between all branches",
            },
          ],
        },
      ],
    });
  }, []);

  return null;
};
