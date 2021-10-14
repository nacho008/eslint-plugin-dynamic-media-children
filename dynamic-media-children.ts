import { Rule } from "eslint";
import { ImportDeclaration } from "@typescript-eslint/types/dist/ast-spec";

var rule = {
  create: function (context: Rule.RuleContext) {
    var acc: string[] = [];

    return {
      ImportDeclaration: function (node: ImportDeclaration) {
        var speficier = node.specifiers[0]?.local?.name;

        acc.push(speficier);
      },
      JSXElement: function (node: any) {
        if (node.openingElement.name.name === "Media") {
          var children = node.children;

          for (var i = 0; i < children.length; i++) {
            if (children[i].type === "JSXElement") {
              if (acc.includes(children[i].openingElement.name.name)) {
                context.report({
                  node: node,
                  message:
                    children[i].openingElement.name.name +
                    " should be a dynamic import",
                });
              }
            }
          }
        }
      },
    };
  },
};

export default rule;
