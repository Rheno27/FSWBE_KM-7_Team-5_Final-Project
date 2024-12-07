import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "@tanstack/react-router";
import styles from "./breadcrumbNav.module.css";

export const BreadcrumbNav = ({ items }) => {
  return (
    <Breadcrumb className={styles.breadcrumb}>
      {items.map((item, index) => {
        // Check if the item is the last item in the list and disable it
        const isLastItem = index === items.length - 1;
        const isDisabled = !item.path && isLastItem;

        return (
          // React fragment is used to avoid additional DOM elements
          <React.Fragment key={index}>
            {/* Check if the item is disabled or not*/}
            {isDisabled ? (
              <Breadcrumb.Item className={styles.disabledBreadcrumb}>
                {item.label}
              </Breadcrumb.Item>
            ) : (
              <Breadcrumb.Item 
                linkAs={Link} 
                linkProps={{ to: item.path }} 
                className={styles.breadcrumbItem}
              >
                {item.label}
              </Breadcrumb.Item>
            )}

            {/* Customize breadcrumb separator */}
            {!isLastItem && <span className={styles.breadcrumbSeparator}>&gt;</span>}
          </React.Fragment>
        );
      })}
    </Breadcrumb>
  );
};