"use client";

import { css } from "@flows/styled-system/css";
import { useAuth } from "auth/client";
import { CreateOrganizationDialog } from "components/organizations";
import { CreateProjectDialog } from "components/projects";
import { useFetch } from "hooks/use-fetch";
import { Check16, ChevronDown16, Plus16 } from "icons";
import Link from "next/link";
import { useParams } from "next/navigation";
import { type FC, useState } from "react";
import { routes } from "routes";
import { t } from "translations";
import { Icon, Popover, PopoverContent, PopoverTrigger, Skeleton, Text } from "ui";

import { MenuItem } from "./menu-item";
import { MenuSection } from "./menu-section";

type TriggerProps = {
  projectName?: string;
  orgName?: string;
  loading?: boolean;
};

const Trigger: FC<TriggerProps> = ({ projectName, orgName, loading }) => {
  return (
    <div
      className={css({
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "space8",
        paddingY: "space4",
        paddingX: "space8",
        borderRadius: "radius8",
        fastEaseInOut: "background-color",
        width: "100%",
        overflow: "hidden",
        height: "44px",
        "&:hover": {
          bg: "bg.hover",
        },
      })}
    >
      <div
        className={css({
          overflow: "hidden",
          flex: 1,
        })}
      >
        {loading ? (
          <>
            <Skeleton className={css({ height: "14px", mt: "3px", mb: "5px", width: "90%" })} />
            <Skeleton className={css({ height: "12px", mb: "2px", width: "60%" })} />
          </>
        ) : (
          <>
            <Text
              className={css({
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              })}
              variant="titleS"
              weight="600"
            >
              {projectName ? projectName : "Select a project"}
            </Text>
            <Text
              className={css({
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              })}
              color="muted"
              variant="bodyXs"
            >
              {orgName}
            </Text>
          </>
        )}
      </div>
      <Icon icon={ChevronDown16} />
    </div>
  );
};

export const ProjectsMenu: FC = () => {
  const [open, setOpen] = useState(false);
  const close = (): void => setOpen(false);
  const { organizationId, projectId } = useParams<{
    organizationId?: string;
    projectId?: string;
  }>();
  const { data: organizations, isLoading: isLoadingOrganizations } = useFetch("/organizations");
  const { data: projects, isLoading: isLoadingProjects } = useFetch(
    "/organizations/:organizationId/projects",
    organizationId ? [organizationId] : null,
  );

  const { auth } = useAuth();
  if (!auth || isLoadingProjects || isLoadingOrganizations) return <Trigger loading />;

  const currentOrg = organizations?.find((org) => org.id === organizationId);
  const currentProject = projects?.find((proj) => proj.id === projectId);

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger>
        <Trigger orgName={currentOrg?.name} projectName={currentProject?.name} />
      </PopoverTrigger>
      <PopoverContent align="end">
        <div
          className={css({
            display: "flex",
          })}
        >
          <div
            className={css({
              borRight: "1px",
              minWidth: "260px",
              backgroundColor: "bg",
            })}
          >
            <MenuSection background="bg.muted" bottomBorder header>
              <Text variant="bodyS" weight="600">
                Organizations ({organizations?.length})
              </Text>
            </MenuSection>
            <MenuSection>
              {organizations?.map((org) => {
                return (
                  <MenuItem
                    asChild
                    className={css({
                      justifyContent: "space-between",
                    })}
                    key={org.id}
                    onClick={close}
                  >
                    <Link href={routes.organization({ organizationId: org.id })}>
                      <Text variant="titleS">{org.name}</Text>
                      {currentOrg?.id === org.id ? (
                        <Icon color="icon.primary" icon={Check16} />
                      ) : null}
                    </Link>
                  </MenuItem>
                );
              })}

              <CreateOrganizationDialog
                trigger={
                  <button type="button">
                    <MenuItem>
                      <Icon color="icon" icon={Plus16} />
                      <Text color="muted" variant="bodyS">
                        {t.actions.newOrg}
                      </Text>
                    </MenuItem>
                  </button>
                }
              />
            </MenuSection>
          </div>

          {organizationId && projects ? (
            <div
              className={css({
                minWidth: "260px",
                backgroundColor: "bg",
              })}
            >
              <MenuSection background="bg.muted" bottomBorder header>
                <Text variant="bodyS" weight="600">
                  {currentOrg?.name} projects ({projects.length})
                </Text>
              </MenuSection>
              <MenuSection>
                {projects.map((proj) => {
                  return (
                    <MenuItem
                      asChild
                      className={css({
                        justifyContent: "space-between",
                      })}
                      key={proj.id}
                      onClick={close}
                    >
                      <Link href={routes.project({ projectId: proj.id, organizationId })}>
                        <Text variant="titleS">{proj.name}</Text>
                        {currentProject?.id === proj.id ? (
                          <Icon color="icon.primary" icon={Check16} />
                        ) : null}
                      </Link>
                    </MenuItem>
                  );
                })}
                <CreateProjectDialog
                  organizationId={organizationId}
                  trigger={
                    <button type="button">
                      <MenuItem>
                        <Icon color="icon" icon={Plus16} />
                        <Text color="muted" variant="bodyS">
                          {t.actions.newProject}
                        </Text>
                      </MenuItem>
                    </button>
                  }
                />
              </MenuSection>
            </div>
          ) : null}
        </div>
      </PopoverContent>
    </Popover>
  );
};
