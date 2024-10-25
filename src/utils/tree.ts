import type React from 'react';
import { cloneDeep } from 'lodash';

interface TreeNodeType {
  children?: TreeNodeType[];
  [key: string]: any;
}

export const updateTreeNodeChildren = <T extends TreeNodeType>(
  list: T[],
  key: React.Key,
  children: T[],
  keyName: string = 'key',
): T[] => {
  return list.map((node) => {
    if (node[keyName] === key) {
      return {
        ...node,
        children,
      };
    }
    if (node.children) {
      return {
        ...node,
        children: updateTreeNodeChildren(node.children, key, children, keyName),
      };
    }
    return node;
  });
};

export const getTreeKeys = <T extends TreeNodeType>(
  list: T[],
  keyName: string,
) => {
  const valueList: any[] = [];
  const findKey = (data: any[]) => {
    for (let i = 0; i < data.length; i += 1) {
      const node = data[i];
      valueList.push(node[keyName]);
      if (node.children && node.children.length) {
        findKey(node.children);
      }
    }
  };
  findKey(list);
  return valueList;
};

export const clearEmptyChildren = <T extends TreeNodeType>(list: T[]) => {
  const newList = cloneDeep(list);
  const clear = (data: T[]) => {
    data.forEach(d => {
      if (Array.isArray(d.children) && d.children.length === 0) {
        delete d.children;
      }
      if (d.children?.length) {
        clear(d.children as T[]);
      }
    });
  }
  clear(newList);
  return newList;
}

export const findFirstNode = <T extends TreeNodeType>(list: T[], predicate: (node: T) => boolean) => {
  const findNode = (data: T[]): T | undefined => {
    for (let i = 0; i < data.length; i += 1) {
      const node = data[i];
      if (predicate(node) === true) {
        return node;
      }
      if (node.children && node.children.length) {
        const originNode = findNode(node.children as T[]);
        if (originNode) return originNode;
      }
    }
    return undefined;
  };
  return findNode(list);
}

export const getTreeLeaves = <T extends TreeNodeType>(treeNode: T) => {
  const leaves: T[] = [];
  const findLeaf = (node: T) => {
    if (!node.children?.length) {
      leaves.push(node);
    } else {
      node.children.forEach(d => findLeaf(d as T));
    }
  }
  findLeaf(treeNode);
  return leaves;
}

export const flattenTree = <T extends TreeNodeType>(list: T[], idKey: string) => {
  const arr: (Omit<T, 'children'> & { pid?: React.Key })[] = [];
  const getTreeItem = (nodes: T[], pid?: React.Key) => {
    nodes.forEach(node => {
      const flattenNode = { ...node, children: undefined, pid };
      delete flattenNode.children;
      arr.push(flattenNode);
      if (node.children?.length) {
        getTreeItem(node.children as T[], node[idKey]);
      }
    });
  }
  getTreeItem(list);
  return arr;
}
