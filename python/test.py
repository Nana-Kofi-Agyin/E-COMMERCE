# name = input("Please enter your name : ")
# age = input("Please enter your age: ")
# school = input("Please enter your school: ")
# special_code = name[0:3] + "_" + age + "_" + school
# print("Your special code is", special_code)

# for i in range(3):
#     print(i)
    
# seats = 100
# while seats > 0:
#     print("Sell tickets")
#     seats = seats - 1

# counter = 1
# while counter < 4:
#     print(counter)
#     counter = counter + 1
# for i in range(3):
#     print(i)
# age = 22
# if age >= 18
#     print("You are verified")
# else:
#     print("I'm Sorry")

# age = 75
# if age < 18:
#     print("Junior discount")
# elif age >= 75:
#     print("Senior discount")
# else:
#     print("No discount")
# print("Processed to payment")
# age = 75
# is_student = True
# if age < 18:
#     if is_student:
#         print("20% discount")

# else:
#     print("Processed to payment")
# age = 40
# if age < 18:
#     print("Junior Discount")
# else:
#     print("No discount")


import itertools
from collections import defaultdict

def get_binary_representation(n, num_vars):
    return format(n, f'0{num_vars}b')

def count_ones(binary_str):
    return binary_str.count('1')

def combine_terms(term1, term2):
    combined = []
    differences = 0

    for b1, b2 in zip(term1, term2):
        if b1 != b2:
            combined.append('-')
            differences += 1
        else:
            combined.append(b1)

    if differences == 1:
        return ''.join(combined)
    return None

def group_by_ones(terms):
    groups = defaultdict(list)
    for term in terms:
        groups[count_ones(term)].append(term)
    return dict(groups)

def find_prime_implicants(minterms, dont_care, num_vars):
    all_terms = [get_binary_representation(term, num_vars) for term in minterms + dont_care]
    grouped_terms = group_by_ones(all_terms)

    prime_implicants = set()
    while grouped_terms:
        next_groups = defaultdict(list)
        used_terms = set()
        new_combinations = set()

        keys = sorted(grouped_terms.keys())
        for i in range(len(keys) - 1):
            for term1 in grouped_terms[keys[i]]:
                for term2 in grouped_terms[keys[i + 1]]:
                    combined = combine_terms(term1, term2)
                    if combined:
                        new_combinations.add(combined)
                        used_terms.update([term1, term2])
                        next_groups[count_ones(combined)].append(combined)

        for terms in grouped_terms.values():
            for term in terms:
                if term not in used_terms:
                    prime_implicants.add(term)

        grouped_terms = next_groups

    return prime_implicants

def find_essential_prime_implicants(prime_implicants, minterms, num_vars):
    coverage = defaultdict(list)

    for minterm in minterms:
        binary = get_binary_representation(minterm, num_vars)
        for implicant in prime_implicants:
            if all(b1 == b2 or b1 == '-' for b1, b2 in zip(implicant, binary)):
                coverage[minterm].append(implicant)

    essential_prime_implicants = set()

    for minterm, implicants in coverage.items():
        if len(implicants) == 1:
            essential_prime_implicants.add(implicants[0])

    return list(essential_prime_implicants)

def sop_format(terms, variables):
    expressions = []

    for term in terms:
        expression = []
        for var, bit in zip(variables, term):
            if bit == '1':
                expression.append(var)
            elif bit == '0':
                expression.append(f"{var}'")
        expressions.append(''.join(expression))

    return ' + '.join(expressions)

def main():
    minterms = [0, 1, 2, 5, 6, 7, 8, 9, 10, 14]
    dont_care = [4, 15]
    variables = ['A', 'B', 'C', 'D']
    num_vars = len(variables)

    prime_implicants = find_prime_implicants(minterms, dont_care, num_vars)
    essential_prime_implicants = find_essential_prime_implicants(prime_implicants, minterms, num_vars)

    minimized_expression = sop_format(essential_prime_implicants, variables)
    print("Minimized Boolean function (SOP):", minimized_expression)

if __name__ == "__main__":
    main()
