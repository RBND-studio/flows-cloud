"use client";

import { css } from "@flows/styled-system/css";
import { useAuth } from "auth/client";
import { CreateOrganizationDialog } from "components/organizations";
import { CreateProjectDialog } from "components/projects";
import { MenuItem } from "components/sidebar/menu-item";
import { MenuSection } from "components/sidebar/menu-section";
import { SafeArea } from "components/sidebar/projects-menu/safe-area";
import { useFetch } from "hooks/use-fetch";
import { Check16, ChevronDown16, Plus16 } from "icons";
import { type OrganizationPreview } from "lib/api";
import Link from "next/link";
import { useParams } from "next/navigation";
import { type FC, useRef, useState } from "react";
import { routes } from "routes";
import { t } from "translations";
import { Icon, MenuSeparator, Popover, PopoverContent, PopoverTrigger, Skeleton, Text } from "ui";

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
  const [openOrg, setOpenOrg] = useState<string | undefined>();

  const parent = useRef<HTMLDivElement>(null);
  const child = useRef<HTMLDivElement>(null);
  const { organizationId, projectId } = useParams<{
    organizationId?: string;
    projectId?: string;
  }>();

  const onOrganizationsFetchSuccess = (data: OrganizationPreview[]): void => {
    setOpenOrg(data.find((org) => org.id === organizationId)?.id ?? undefined);
  };

  const { data: organizations, isLoading: isLoadingOrganizations } = useFetch(
    "/organizations",
    [],
    { onSuccess: onOrganizationsFetchSuccess },
  );
  const { auth } = useAuth();

  if (!auth || isLoadingOrganizations) return <Trigger loading />;

  const currentOrg = organizations?.find((org) => org.id === organizationId);
  const highlightedOrg = organizations?.find((org) => org.id === openOrg);
  const currentProject = currentOrg?.projects.find((proj) => proj.id === projectId);

  return (
    <Popover
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          setOpenOrg(undefined);
        }
        setOpen(isOpen);
      }}
      open={open}
    >
      <PopoverTrigger>
        <Trigger orgName={currentOrg?.name} projectName={currentProject?.name} />
      </PopoverTrigger>
      <PopoverContent align="end">
        <div
          className={css({
            display: "flex",
            position: "relative",
          })}
          ref={parent}
        >
          {open && parent.current && child.current ? <SafeArea submenu={child.current} /> : null}
          <div
            className={css({
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
              <ul>
                {organizations?.map((org) => {
                  return (
                    <MenuItem
                      asChild
                      className={css({
                        justifyContent: "space-between",
                        // Prevent cursor flickering when hovering over orgs + you can't click them anyway
                        cursor: "default",
                      })}
                      key={org.id}
                    >
                      <li
                        data-active={highlightedOrg?.id === org.id ? "true" : undefined}
                        onMouseEnter={() => {
                          setOpenOrg(org.id);
                        }}
                      >
                        <Text variant="titleS">{org.name}</Text>
                        {currentOrg?.id === org.id ? (
                          <Icon color="icon.primary" icon={Check16} />
                        ) : null}
                      </li>
                    </MenuItem>
                  );
                })}
              </ul>

              <CreateOrganizationDialog
                trigger={
                  <button
                    type="button"
                    onMouseEnter={() => {
                      setOpenOrg(undefined);
                    }}
                  >
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
          {highlightedOrg ? (
            <div
              className={css({
                borLeft: "1px",
                minWidth: "260px",
                backgroundColor: "bg",
                display: "flex",
                flexDirection: "column",
              })}
              ref={child}
            >
              <MenuSection background="bg.muted" bottomBorder header>
                <Text variant="bodyS" weight="600">
                  {highlightedOrg.name} projects ({highlightedOrg.projects.length})
                </Text>
              </MenuSection>
              <MenuSection>
                {highlightedOrg.projects.map((proj) => {
                  return (
                    <MenuItem
                      asChild
                      className={css({
                        justifyContent: "space-between",
                      })}
                      key={proj.id}
                      onClick={() => setOpen(false)}
                    >
                      <Link
                        href={routes.project({
                          projectId: proj.id,
                          organizationId: highlightedOrg.id,
                        })}
                      >
                        <Text variant="titleS">{proj.name}</Text>
                        {currentProject?.id === proj.id ? (
                          <Icon color="icon.primary" icon={Check16} />
                        ) : null}
                      </Link>
                    </MenuItem>
                  );
                })}
                <CreateProjectDialog
                  organizationId={highlightedOrg.id}
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
                <MenuSeparator />
                <MenuItem asChild>
                  <Text asChild color="muted" variant="bodyS">
                    <Link href={routes.organizationSettings({ organizationId: highlightedOrg.id })}>
                      Organization settings
                    </Link>
                  </Text>
                </MenuItem>
              </MenuSection>
            </div>
          ) : null}
        </div>
      </PopoverContent>
    </Popover>
  );
};
